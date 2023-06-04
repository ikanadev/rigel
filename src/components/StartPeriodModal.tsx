import { Component, For, createSignal, createEffect } from "solid-js";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Flex,
	Text,
	Button,
	SimpleSelect,
	SimpleOption,
} from "@hope-ui/solid";

import { nanoid } from "nanoid";
import { useAppData } from "@app/context";
import { errorSignal } from "@app/hooks";
import { startClassPeriod } from "@app/db/classPeriod";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}
const StartPeriodModal: Component<Props> = (props) => {
	const { reportError } = errorSignal;
	const [periodId, setPeriodId] = createSignal<string | null>(null);
	const { classStore, year } = useAppData();

	createEffect(() => {
		if (year.periods.length > 0) {
			setPeriodId(year.periods[0].id);
		}
	});

	const onCreate = () => {
		const period = year.periods.find((p) => p.id === periodId());
		if (period === undefined || classStore.class === null) return;
		const date = Date.now();
		startClassPeriod({
			id: nanoid(),
			finished: false,
			start: date,
			end: date,
			period: { id: period.id, name: period.name },
			class_id: classStore.class.id,
		})
			.then(() => {
				props.onClose();
			})
			.catch((err) => {
				void reportError("Starting period", err);
			});
	};

	return (
		<Modal
			centered
			opened={props.isOpen}
			onClose={() => props.onClose()}
			size="sm"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader>Iniciar nuevo periodo</ModalHeader>
				<ModalBody>
					<Flex flexDirection="column">
						<Text>Periodo:</Text>
						<SimpleSelect value={periodId()} onChange={setPeriodId}>
							<For each={year.periods}>
								{(period) => (
									<SimpleOption value={period.id}>{period.name}</SimpleOption>
								)}
							</For>
						</SimpleSelect>
						<Text size="sm" mt="$2">
							Un periodo es un trimestre o bimestre dependiendo de la
							gesti&oacute;n.
						</Text>
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="neutral"
						size="sm"
						mr="$2"
						onClick={() => props.onClose()}
					>
						Cancelar
					</Button>
					<Button colorScheme="success" size="sm" onClick={onCreate}>
						Iniciar periodo
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default StartPeriodModal;
