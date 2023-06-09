import { Component, Show, For, createSignal } from "solid-js";
import { Flex, Button } from "@hope-ui/solid";
import { Title } from "@app/components";
import { Plus } from "@app/icons";
import { Activity } from "@app/types";
import Area from "./Area";
import NewActivityModal from "./NewActivityModal";
import NoActivePeriodMessage from "./NoActivePeriodMessage";

import { useAppData } from "@app/context";
import { booleanSignal } from "@app/hooks";

const Activities: Component = () => {
	const [activity, setActivity] = createSignal<Activity | null>(null);
	const modal = booleanSignal();
	const { year, classStore } = useAppData();

	const closeModal = () => {
		modal.disable();
		setActivity(null);
	};

	const onEditActivity = (activity: Activity) => {
		setActivity(activity);
		modal.enable();
	};

	return (
		<>
			<NewActivityModal
				isOpen={modal.isActive()}
				onClose={closeModal}
				activity={activity()}
			/>
			<Flex justifyContent="space-between" flexWrap="wrap">
				<Title text="Actividades" />
				<Show when={classStore.classPeriod !== null}>
					<Button
						colorScheme="success"
						leftIcon={<Plus />}
						size="sm"
						onClick={modal.enable}
						textTransform="uppercase"
					>
						Nueva Actividad
					</Button>
				</Show>
			</Flex>
			<Show
				when={classStore.classPeriod !== null}
				fallback={<NoActivePeriodMessage />}
			>
				<For each={year.areas}>
					{(area) => <Area area={area} onEditActivity={onEditActivity} />}
				</For>
			</Show>
		</>
	);
};

export default Activities;
