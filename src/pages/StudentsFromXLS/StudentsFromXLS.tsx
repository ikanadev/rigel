import { createSignal, Show, For } from "solid-js";
import {
	Flex,
	Text,
	Button,
	Image,
	Tabs,
	TabList,
	Tab,
	TabPanel,
} from "@hope-ui/solid";
import { Title, Alert } from "@app/components";
import { XLS, ChevronLeft } from "@app/icons";
import { OnChangeEvent, XMLData } from "@app/types";
import DataSelector from "./DataSelector";

import { parseXLS } from "@app/api";
import { useAppData } from "@app/context";

const StudentFromXLS = () => {
	let inputRef: HTMLInputElement | undefined;
	const { classStore } = useAppData();
	const [isLoading, setIsLoading] = createSignal(false);
	const [errMsg, setErrMsg] = createSignal("");
	const [xmlData, setXMLData] = createSignal<XMLData | null>(null);

	const handleFileChange: OnChangeEvent = (ev) => {
		const files = ev.currentTarget.files;
		if (files === null || files.length === 0) return;
		setIsLoading(true);
		parseXLS(files[0])
			.then((res) => {
				setXMLData(res);
			})
			.catch(() => {
				setErrMsg("Error leyendo archivo");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleSelectFile = () => {
		if (inputRef === undefined) return;
		inputRef.click();
	};

	return (
		<>
			<Title
				text="Agregar estudiantes desde Excel"
				backTo={`/class/${classStore.class!.id}/students`}
			/>
			<input
				ref={inputRef}
				onChange={handleFileChange}
				accept=".xlam, .xlsm, .xlsx, .xltm, .xltx"
				type="file"
				style={{ display: "none" }}
			/>
			<Alert status="danger" text={errMsg()} setText={setErrMsg} />
			<Show when={xmlData() === null}>
				<Flex justifyContent="center" mt="$6">
					<Flex flexDirection="column" alignItems="center" maxW="$lg" gap="$4">
						<Text textAlign="center">
							Asegúrate que tu archivo tenga los nombres en una columna y los
							apellidos en otra, como se muestra en la imagen.
						</Text>
						<Image src="/xlsSample.png" shadow="$md" />
						<Button
							onClick={handleSelectFile}
							loading={isLoading()}
							loadingText="Analizando archivo"
							rightIcon={<XLS w="$5" h="$5" />}
							size="sm"
							colorScheme="success"
						>
							Seleccionar archivo
						</Button>
					</Flex>
				</Flex>
			</Show>
			<Show when={xmlData() !== null}>
				<>
					<Button
						leftIcon={<ChevronLeft w="$4" h="$4" />}
						mt="$4"
						size="sm"
						variant="subtle"
						onClick={[setXMLData, null]}
					>
						Usar otro archivo
					</Button>
					<Text my="$2">
						{Object.keys(xmlData()!).length}{" "}
						{Object.keys(xmlData()!).length === 1
							? "hoja encontrada"
							: "hojas encontradas"}{" "}
						en el archivo Excel. Seleccione la que contiene a los estudiantes.
					</Text>
					<Tabs variant="cards" size="sm">
						<TabList maxW="$full" overflowX="auto" overflowY="hidden">
							<For each={Object.keys(xmlData()!)}>
								{(key) => <Tab>{key}</Tab>}
							</For>
						</TabList>
						<For each={Object.keys(xmlData()!)}>
							{(key) => (
								<TabPanel>
									<DataSelector data={xmlData()![key]} />
								</TabPanel>
							)}
						</For>
					</Tabs>
				</>
			</Show>
		</>
	);
};

export default StudentFromXLS;
