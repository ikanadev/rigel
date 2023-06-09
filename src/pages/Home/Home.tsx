import type { Component } from "solid-js";

import { Show, onMount, createSignal } from "solid-js";
import { Container } from "@hope-ui/solid";
import { Header, Drawer } from "@app/components";
import { AppProvider } from "@app/context";

import { useNavigate, Outlet } from "@solidjs/router";
import { syncStaticData } from "@app/db/static";
import { sendAppErrorsToServer } from "@app/db/appErrors";
import { syncProfile } from "@app/db/teacher";
import { JWT_KEY } from "@app/utils/constants";

const Home: Component = () => {
	const [isDrawerOpen, setDrawerOpen] = createSignal(false);
	const jwt = localStorage.getItem(JWT_KEY);
	const navigate = useNavigate();

	const toggleDrawer = () => setDrawerOpen((prev) => !prev);

	onMount(() => {
		if (jwt === null) {
			navigate("/signin");
			return;
		}
		void syncProfile();
		void syncStaticData();
		void sendAppErrorsToServer();
	});

	return (
		<Show when={jwt !== null}>
			<AppProvider>
				<Header openDrawer={toggleDrawer} />
				<Drawer isOpen={isDrawerOpen()} onClose={toggleDrawer} />
				<Container px={{ "@initial": "$2", "@md": "$4" }} py="$4">
					<Outlet />
				</Container>
			</AppProvider>
		</Show>
	);
};

export default Home;
