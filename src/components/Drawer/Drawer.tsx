import type { Component } from 'solid-js';

import {
  Drawer as HopeDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  Box,
} from '@hope-ui/solid';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const Drawer: Component<Props> = (props) => {
  return (
    <HopeDrawer
      opened={props.isOpen}
      placement="left"
      onClose={() => props.onClose()}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Box border="1px solid red">
            <Text>Some body text</Text>
          </Box>
        </DrawerHeader>

        <DrawerBody>
          <Text>Some body text</Text>
        </DrawerBody>

        <DrawerFooter>
          <Text>Some body text</Text>
        </DrawerFooter>
      </DrawerContent>
    </HopeDrawer>
  );
};

export default Drawer;
