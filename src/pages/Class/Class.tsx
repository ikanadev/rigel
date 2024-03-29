import type { Component } from "solid-js";

import { Show } from "solid-js";
import { Outlet } from "@solidjs/router";

import { useAppData } from "@app/context";

const Class: Component = () => {
	const { classStore } = useAppData();
	return (
		// we ensure selected class exists in Class subroutes
		<Show when={classStore.class !== null}>
			<Outlet />
		</Show>
	);
};

export default Class;
