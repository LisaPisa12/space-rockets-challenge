import React, { useRef, useContext } from "react";
import { IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { LaunchPadItem } from "../components/launch-pads";
import { LaunchItem } from "../components/launches";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { GlobalContext } from "../Context/GlobalState";

export default function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const { favoriteLaunches, favoriteLaunchPads } = useContext(GlobalContext);

  return (
    <>
      <Tooltip label="Favorites" placement="left">
        <IconButton
          size="lg"
          colorScheme="white"
          icon={<StarIcon />}
          ref={btnRef}
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Favorites</DrawerHeader>

            <DrawerBody>
              <Box mb={4}>
                <Heading>{`Launches(${favoriteLaunches.length})`}</Heading>
              </Box>
              {favoriteLaunches.length > 0
                ? favoriteLaunches.map((launch) => {
                    const savedLaunchPad = favoriteLaunches.find(
                      (item) => item.id === launch.id
                    );

                    const disableAdd = savedLaunchPad ? true : false;
                    return (
                      <LaunchItem launch={launch} isDisabled={disableAdd} />
                    );
                  })
                : ""}
              <Box mt={10} mb={4}>
                <Heading>{`Launchpads(${favoriteLaunchPads.length})`}</Heading>
              </Box>
              {favoriteLaunchPads.length > 0
                ? favoriteLaunchPads.map((launchPad) => {
                    const savedLaunchPad = favoriteLaunchPads.find(
                      (item) => item.id === launchPad.id
                    );

                    const disableAdd = savedLaunchPad ? true : false;
                    return (
                      <LaunchPadItem
                        launchPad={launchPad}
                        isDisabled={disableAdd}
                      />
                    );
                  })
                : ""}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
