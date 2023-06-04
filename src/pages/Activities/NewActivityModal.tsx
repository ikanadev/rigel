import { Component, For, createSignal, createEffect } from "solid-js";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	SimpleSelect,
	SimpleOption,
	Flex,
	Text,
	Button,
	Input,
} from "@hope-ui/solid";
import { Activity } from "@app/types";

import { nanoid } from "nanoid";
import { errorSignal } from "@app/hooks";
import { useAppData } from "@app/context";
import { addActivity, updateActivity } from "@app/db/activities";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	activity: Activity | null;
}
const NewActivityModal: Component<Props> = (props) => {
	const { reportError } = errorSignal;
	const [areaId, setAreaId] = createSignal("");
	const [activityName, setActivityName] = createSignal("");
	const { year, classStore } = useAppData();
	const isUpdating = () => props.activity !== null;

	createEffect(() => {
		if (props.activity === null) {
			if (year.areas.length > 0) {
				setAreaId(year.areas[0].id);
			}
		} else {
			setAreaId(props.activity.area_id);
			setActivityName(props.activity.name);
		}
	});

	const onUpdate = () => {
		if (classStore.classPeriod?.id === undefined) return;
		if (areaId() === "") return;
		if (props.activity === null) return;
		updateActivity({
			id: props.activity.id,
			name: activityName(),
			area_id: areaId(),
		})
			.then(() => {
				setActivityName("");
				props.onClose();
			})
			.catch((err) => {
				void reportError("Updating activity", err);
			});
	};

	const onCreate = () => {
		if (classStore.classPeriod === null) return;
		if (areaId() === "") return;
		addActivity({
			id: nanoid(),
			date: Date.now(),
			name: activityName(),
			area_id: areaId(),
			class_period_id: classStore.classPeriod.id,
		})
			.then(() => {
				setActivityName("");
				props.onClose();
			})
			.catch((err) => {
				void reportError("Creating new activity", err);
			});
	};

	return (
		<Modal opened={props.isOpen} onClose={() => props.onClose()} size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader>
					{isUpdating() ? "Actualizar actividad" : "Crear actividad"}
				</ModalHeader>
				<ModalBody>
					<Flex flexDirection="column">
						<Text size="sm" my="$2">
							Una actividad puede ser una tarea, examen, revisión de cuadernos,
							o todo lo que se pueda calificar. Las calificaciones siempre son
							sobre 100.
						</Text>
						<Input
							value={activityName()}
							onInput={(ev) => setActivityName(ev.currentTarget.value)}
							placeholder="Actividad"
							mb="$2"
						/>
						<Text size="sm" mb="$1">
							Área
						</Text>
						<SimpleSelect value={areaId()} onChange={setAreaId}>
							<For each={year.areas}>
								{(area) => (
									<SimpleOption value={area.id}>{area.name}</SimpleOption>
								)}
							</For>
						</SimpleSelect>
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
					<Button
						colorScheme="success"
						size="sm"
						onClick={isUpdating() ? onUpdate : onCreate}
						disabled={activityName().trim() === ""}
					>
						{isUpdating() ? "Actualizar" : "Crear actividad"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NewActivityModal;
