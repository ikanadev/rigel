import type { Component } from "solid-js";

import {
	Select,
	SelectTrigger,
	SelectIcon,
	SelectContent,
	SelectListbox,
	SelectOption,
	Text,
	Flex,
	Badge,
	Box,
} from "@hope-ui/solid";

import { For, Show } from "solid-js";
import { useNavigate, useLocation, useMatch } from "@solidjs/router";
import { createDexieArrayQuery } from "solid-dexie";
import { useAppData } from "@app/context";
import { db } from "@app/db/dexie";

/** Only call it in a class specific route component */
const ClassSelector: Component = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const classes = createDexieArrayQuery(() => db.classes.toArray());
	const { actions, classStore } = useAppData();

	// these routes don't need a class selector
	const matchEditStudent = useMatch(
		() => "/class/:classid/student/:studentid/edit",
	);
	const matchActivity = useMatch(() => "/class/:classid/activity/:activityid");
	const matchProfile = useMatch(() => "/profile");

	const handleChange = (classId: string) => {
		if (classStore.class === null) return;
		const path = location.pathname.replace(classStore.class.id, classId);
		const newClass = classes.find((c) => c.id === classId);
		actions.setSelectedClass(newClass ?? null);
		navigate(path);
	};

	return (
		<Show
			when={
				classStore.class !== null &&
				matchEditStudent() === null &&
				matchActivity() === null &&
				matchProfile() === null
			}
		>
			<Select onChange={handleChange} value={classStore.class!.id}>
				<SelectTrigger border="none" py="$0_5" px="$2">
					<Flex flexDirection="column" minW="$60">
						<Text
							fontWeight="$semibold"
							textAlign="start"
							size="sm"
							overflow="hidden"
							maxW="$full"
						>
							{classStore.class?.subject.name}
						</Text>
						<Flex flexWrap="wrap">
							<Text size="sm" textAlign="start" flex="1">
								{classStore.class?.grade.name}
							</Text>
							<Badge colorScheme="primary" fontSize="$sm">
								{classStore.class?.parallel}
							</Badge>
						</Flex>
					</Flex>
					<SelectIcon ml="$2" />
				</SelectTrigger>
				<SelectContent>
					<SelectListbox p="$2">
						<For each={classes}>
							{(cl) => (
								<SelectOption value={cl.id} p="$1">
									<Flex flexDirection="column">
										<Text fontWeight="$semibold" size="sm">
											{cl.subject.name}
										</Text>
										<Text size="xs">{cl.grade.name}</Text>
									</Flex>
									<Box flex={1} />
									<Badge colorScheme="primary">{cl.parallel}</Badge>
								</SelectOption>
							)}
						</For>
					</SelectListbox>
				</SelectContent>
			</Select>
		</Show>
	);
};

export default ClassSelector;
