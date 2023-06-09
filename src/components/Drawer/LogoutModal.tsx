import { Component, Show, createEffect, createSignal } from "solid-js";
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
} from "@hope-ui/solid";
import { Alert } from "@app/components";

import { db } from "@app/db/dexie";
import worker from "@app/utils/worker";
import { liveQuery, Subscription } from "dexie";
import { useAppData } from "@app/context";
import { useNavigate } from "@solidjs/router";
import { EXIT_MESSAGE, JWT_KEY, DEFAULT_CLASS_KEY } from "@app/utils/constants";

const getMissingTxs = async () => {
	const scoreTxs = await db.scoreTransactions.count();
	const studentTxs = await db.studentTransactions.count();
	const actTxs = await db.activityTransactions.count();
	const attTxs = await db.attendanceTransactions.count();
	const classPeriodTxs = await db.classPeriodTransactions.count();
	const attDayTxs = await db.attendanceDayTransactions.count();
	return scoreTxs + studentTxs + actTxs + attTxs + classPeriodTxs + attDayTxs;
};
const missingTxsObs = liveQuery(getMissingTxs);

interface Props {
	isOpen: boolean;
	onClose: () => void;
}
const LogoutModal: Component<Props> = (props) => {
	const navigate = useNavigate();
	const {
		actions: { clearAll },
	} = useAppData();
	const [missingTxs, setMissingTxs] = createSignal(0);
	let subscription: Subscription;

	const handleLogout = () => {
		props.onClose();
		worker.postMessage({ type: EXIT_MESSAGE });
		const clearDb = async (): Promise<void> => {
			await Promise.all(db.tables.map((table) => table.clear()));
			localStorage.removeItem(JWT_KEY);
			localStorage.removeItem(DEFAULT_CLASS_KEY);
		};
		clearDb().finally(() => {
			clearAll();
			props.onClose();
			navigate("/signin");
		});
	};

	createEffect(() => {
		if (props.isOpen) {
			subscription = missingTxsObs.subscribe({
				next: (n) => setMissingTxs(n),
			});
		} else {
			if (subscription !== undefined) {
				subscription.unsubscribe();
			}
		}
	});

	return (
		// eslint-disable-next-line solid/reactivity
		<Modal opened={props.isOpen} onClose={props.onClose} size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalHeader>Confirmar cierre de sesión</ModalHeader>
				<ModalBody>
					<Flex my="$4">
						<Show when={missingTxs() > 0}>
							<Alert
								status="warning"
								text={`Hay ${missingTxs()} operaciones no almacenadas, conéctate a Internet para guardarlas. (Los guardados se realizan cada 30 segundos).`}
							/>
						</Show>
					</Flex>
					<Text my="$2">
						¿Deseas cerrar sesión?.{" "}
						{missingTxs() > 0
							? ` Se perderán ${missingTxs()} operaciones.`
							: ""}
					</Text>
				</ModalBody>
				<ModalFooter>
					{/* eslint-disable-next-line solid/reactivity */}
					<Button size="sm" colorScheme="neutral" onClick={props.onClose}>
						Permanecer en la WebApp
					</Button>
					<Button ml="$2" size="sm" colorScheme="danger" onClick={handleLogout}>
						Si, cerrar sesión
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default LogoutModal;
