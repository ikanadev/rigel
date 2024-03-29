import type { Component } from "solid-js";

import { Show, createEffect } from "solid-js";
import { Heading, Anchor, Flex, IconButton } from "@hope-ui/solid";
import { Link } from "@solidjs/router";
import { ChevronLeft } from "@app/icons";

import { APP_NAME } from "@app/utils/constants";

interface Props {
	text: string;
	backTo?: string;
}
const Title: Component<Props> = (props) => {
	createEffect(() => {
		document.title = `${APP_NAME} | ${props.text}`;
	});
	return (
		<Flex alignItems="center">
			<Show when={props.backTo !== undefined}>
				<Anchor as={Link} href={props.backTo ?? "/"}>
					<IconButton
						aria-label="Atrás"
						variant="subtle"
						size="sm"
						mr="$2"
						colorScheme="neutral"
						icon={<ChevronLeft />}
					/>
				</Anchor>
			</Show>
			<Heading size="2xl">{props.text}</Heading>
		</Flex>
	);
};

export default Title;
