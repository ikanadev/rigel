import type { Component } from "solid-js";

import { Alert, AlertIcon } from "@hope-ui/solid";

const OfflineMessage: Component = () => {
	return (
		<Alert status="warning">
			<AlertIcon mr="$2" />
			Lo sentimos, pero esta sección requiere conexión a Internet.
		</Alert>
	);
};

export default OfflineMessage;
