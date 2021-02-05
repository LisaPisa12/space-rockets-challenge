import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";
import { ChakraProvider } from "@chakra-ui/react";
import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoritesDrawer from "./favoritesDrawer";
import GlobalProvider from "../Context/GlobalState";

export default function App() {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/launches/:launchId" element={<Launch />} />
          <Route path="/launch-pads" element={<LaunchPads />} />
          <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
        </Routes>
      </ChakraProvider>
    </GlobalProvider>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
        as={Link}
        to="/"
      >
        ¡SPACE·R0CKETS!
      </Text>

      <FavoritesDrawer />
    </Flex>
  );
}
