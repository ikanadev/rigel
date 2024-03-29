import type { Component, JSX } from "solid-js";
import type { InputState, FormSubmitHandler } from "@app/types";

import { Show, createSignal } from "solid-js";
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
import { useNavigate, Link } from "@solidjs/router";
import {
	nonEmptyValidator,
	emailValidator,
	minLenValidator,
	getErrorMsg,
} from "@app/utils/functions";
import { signUp } from "@app/api";

interface FormData {
	name: InputState;
	lastName: InputState;
	email: InputState;
	password: InputState;
}
const validators: { [key in keyof FormData]: Array<(val: string) => string> } =
	{
		name: [nonEmptyValidator],
		lastName: [nonEmptyValidator],
		email: [nonEmptyValidator, emailValidator],
		password: [nonEmptyValidator, minLenValidator(6)],
	};
const emptyField: () => InputState = () => ({
	value: "",
	errorMsg: "",
	isTouched: false,
});

const SignUp: Component = () => {
	const { reportError } = errorSignal;
	const navigate = useNavigate();
	const [serverErr, setServerErr] = createSignal("");
	const [formData, setFormData] = createStore<FormData>({
		name: emptyField(),
		lastName: emptyField(),
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
		signUp({
			name: formData.name.value,
			lastName: formData.lastName.value,
			email: formData.email.value,
			password: formData.password.value,
		})
			.then(() => {
				navigate("/signin?signup=success");
			})
			.catch((err) => {
				getErrorMsg(err)
					.then((msg) => {
						setServerErr(msg);
					})
					.catch((err) => {
						void reportError("SignUp into app", err);
					});
			});
	};

	return (
		<Container p="$4" pos="relative">
			<Box pos="absolute" top="$3" right="$3">
				<ColorModeButton />
			</Box>

			<Flex flexDirection="column" mt="$16">
				<Flex flexDirection="column" alignItems="center">
					<Box maxW="$28" mb="$1" mr="$3">
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
							Registrate para iniciar:
						</Heading>
						<Text color="$danger10" size="sm" textAlign="center">
							{serverErr()}
						</Text>
						<Input
							onInput={onChange}
							value={formData.name.value}
							name="name"
							placeholder="Nombre(s)"
							invalid={formData.name.isTouched && formData.name.errorMsg !== ""}
							mt="$4"
							autocomplete="off"
						/>
						<Show
							when={formData.name.isTouched && formData.name.errorMsg !== ""}
						>
							<Text color="$danger10" size="sm">
								{formData.name.errorMsg}
							</Text>
						</Show>
						<Input
							onInput={onChange}
							value={formData.lastName.value}
							name="lastName"
							placeholder="Apellidos"
							invalid={
								formData.lastName.isTouched && formData.lastName.errorMsg !== ""
							}
							mt="$4"
							autocomplete="off"
						/>
						<Show
							when={
								formData.lastName.isTouched && formData.lastName.errorMsg !== ""
							}
						>
							<Text color="$danger10" size="sm">
								{formData.lastName.errorMsg}
							</Text>
						</Show>
						<Input
							onInput={onChange}
							value={formData.email.value}
							name="email"
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
							my="$4"
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
						<Text color="$neutral11" size="sm" mb="$2">
							Al registraste en Auleca, est&aacute;s aceptando nuestros{" "}
							<Anchor
								as={Link}
								href="https://auleca.com/term_and_conditions"
								target="_blank"
								fontWeight="$bold"
								color="$primary11"
							>
								t&eacute;rminos y condiciones de uso.
							</Anchor>
						</Text>
						<Show
							when={isOnline()}
							fallback={
								<Alert status="warning" text="No hay conexión a Internet" />
							}
						>
							<Button disabled={isDisabled()} type="submit">
								Darme de Alta
							</Button>
						</Show>
						<Text color="$neutral11" textAlign="right" size="sm" mt="$2">
							¿Ya tienes una cuenta?{" "}
							<Anchor
								as={Link}
								href="/signin"
								fontWeight="$bold"
								color="$primary11"
							>
								Iniciar sesión
							</Anchor>
						</Text>
					</Flex>
				</Flex>
			</form>
		</Container>
	);
};

export default SignUp;
