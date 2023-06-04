import type { Component, JSX } from "solid-js";
import type { InputState, FormSubmitHandler } from "@app/types";

import { Show, createSignal, createEffect } from "solid-js";
import {
	Container,
	Flex,
	Box,
	Text,
	Heading,
	Input,
	Button,
	Anchor,
} from "@hope-ui/solid";
import { Logo } from "@app/icons";
import { ColorModeButton, Alert } from "@app/components";

import { errorSignal, isOnline } from "@app/hooks";
import { createStore } from "solid-js/store";
import { useNavigate, useSearchParams, Link } from "@solidjs/router";
import {
	nonEmptyValidator,
	emailValidator,
	minLenValidator,
	getErrorMsg,
} from "@app/utils/functions";
import { JWT_KEY } from "@app/utils/constants";
import { signIn } from "@app/api";
import { saveTeacher } from "@app/db/teacher";

interface FormData {
	email: InputState;
	password: InputState;
}
const validators: { [key in keyof FormData]: Array<(val: string) => string> } =
	{
		email: [nonEmptyValidator, emailValidator],
		password: [nonEmptyValidator, minLenValidator(6)],
	};
const emptyField: () => InputState = () => ({
	value: "",
	errorMsg: "",
	isTouched: false,
});

const SignIn: Component = () => {
	const { reportError } = errorSignal;
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const [signUpMsg, setSignUpMsg] = createSignal("");
	const [serverErr, setServerErr] = createSignal("");
	const [isLoading, setIsLoading] = createSignal(false);
	const [formData, setFormData] = createStore<FormData>({
		email: emptyField(),
		password: emptyField(),
	});

	const isDisabled = (): boolean => {
		return Object.keys(formData).some(
			(key) =>
				formData[key as keyof FormData].errorMsg !== "" ||
				formData[key as keyof FormData].value === "",
		);
	};

	const onChange: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (
		ev,
	) => {
		const el = ev.currentTarget;
		const field = el.name as keyof FormData;
		if (serverErr() !== "") {
			setServerErr("");
		}
		if (!formData[field].isTouched) {
			setFormData(field, "isTouched", true);
		}
		setFormData(field, "value", el.value);
		let errorStr = "";
		for (const validator of validators[field]) {
			const err = validator(el.value);
			if (err !== "") {
				errorStr = err;
				break;
			}
		}
		setFormData(field, "errorMsg", errorStr);
	};

	const handleSubmit: FormSubmitHandler = (ev) => {
		ev.preventDefault();
		setIsLoading(true);
		const handleSave = async (): Promise<void> => {
			const resp = await signIn({
				email: formData.email.value,
				password: formData.password.value,
			});
			await saveTeacher(resp.teacher);
			localStorage.setItem(JWT_KEY, resp.jwt);
			navigate("/");
		};
		handleSave()
			.catch((err) => {
				getErrorMsg(err)
					.then((msg) => {
						setServerErr(msg);
					})
					.catch((err) => {
						void reportError("SignIn error", err);
					});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	createEffect(() => {
		if (params.signup !== undefined) {
			setSignUpMsg("Cuenta creada, ahora puede iniciar sesión.");
		}
	});

	return (
		<Container p="$4" pos="relative">
			<Box pos="absolute" top="$3" right="$3">
				<ColorModeButton />
			</Box>

			<Flex flexDirection="column" mt="$16">
				<Flex flexDirection="column" alignItems="center">
					<Box maxW="$36" mb="$1" mr="$3">
						<Logo w="100%" h="100%" />
					</Box>
					<Heading level="1" size="4xl" color="$primary9">
						Auleca
					</Heading>
					<Text textAlign="center" mt="$2">
						La Aplicación Web de los profesores de Bolivia. 🇧🇴
					</Text>
				</Flex>
			</Flex>

			<form onSubmit={handleSubmit}>
				<Flex justifyContent="center">
					<Flex flexDirection="column" mt="$8" w="$full" maxW="$96">
						<Heading level="3" size="xl" color="$primary9" mb="$4">
							Iniciar sesión:
						</Heading>
						<Alert text={signUpMsg()} status="success" setText={setSignUpMsg} />
						<Alert text={serverErr()} status="warning" setText={setServerErr} />
						<Input
							onInput={onChange}
							value={formData.email.value}
							name="email"
							type="email"
							placeholder="Correo"
							invalid={
								formData.email.isTouched && formData.email.errorMsg !== ""
							}
							mt="$4"
							autocomplete="off"
						/>
						<Show
							when={formData.email.isTouched && formData.email.errorMsg !== ""}
						>
							<Text color="$danger10" size="sm">
								{formData.email.errorMsg}
							</Text>
						</Show>
						<Input
							onInput={onChange}
							value={formData.password.value}
							name="password"
							placeholder="Contraseña"
							invalid={
								formData.password.isTouched && formData.password.errorMsg !== ""
							}
							mt="$4"
							mb="$8"
							type="password"
						/>
						<Show
							when={
								formData.password.isTouched && formData.password.errorMsg !== ""
							}
						>
							<Text color="$danger10" size="sm">
								{formData.password.errorMsg}
							</Text>
						</Show>
						<Show
							when={isOnline()}
							fallback={
								<Alert status="warning" text="No hay conexión a Internet" />
							}
						>
							<Button
								disabled={isDisabled()}
								loading={isLoading()}
								type="submit"
							>
								Iniciar
							</Button>
						</Show>
						<Text color="$neutral11" textAlign="right" size="sm" mt="$2">
							¿Aún no tienes una cuenta?{" "}
							<Anchor
								as={Link}
								href="/signup"
								fontWeight="$bold"
								color="$primary11"
							>
								Registrarme
							</Anchor>
						</Text>
					</Flex>
				</Flex>
			</form>
		</Container>
	);
};

export default SignIn;
