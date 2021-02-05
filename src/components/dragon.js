import React from "react";
import { useParams } from "react-router-dom";
import { format as timeAgo } from "timeago.js";
import { Watch, Navigation, Tool } from "react-feather";
import {
  Flex,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Image,
  Stack,
} from "@chakra-ui/core";

import { useSpaceX } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";

export default function Dragon() {
  let { dragonId } = useParams();
  const { data: dragon, error } = useSpaceX(`/dragons/${dragonId}`);

  if (error) return <Error />;
  if (!dragon) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dragons", to: ".." },
          { label: `#${dragon.id.slice(-1)}` },
        ]}
      />
      <Header dragon={dragon} />
      <Box m={[3, 6]}>
        <TimeAndLocation dragon={dragon} />
        <RocketInfo dragon={dragon} />
        <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
          {dragon.description}
        </Text>

        <Gallery images={dragon.flickr_images} />
      </Box>
    </div>
  );
}

function Header({ dragon }) {
  return (
    <Flex
      bgImage={`url(${dragon.flickr_images[0]})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Heading
        color="white"
        display="inline"
        backgroundColor="#718096b8"
        fontSize={["lg", "5xl"]}
        px="4"
        py="2"
        borderRadius="lg"
      >
        {dragon.name}
      </Heading>
      <Stack isInline spacing="3">
        <Badge variantColor="purple" fontSize={["xs", "md"]}>
          #{dragon.id}
        </Badge>
        {dragon.active ? (
          <Badge variantColor="green" fontSize={["xs", "md"]}>
            Active
          </Badge>
        ) : (
          <Badge variantColor="red" fontSize={["xs", "md"]}>
            Not Active
          </Badge>
        )}
      </Stack>
    </Flex>
  );
}

function TimeAndLocation({ dragon }) {
  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={Watch} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Date
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>{dragon.first_flight}</StatNumber>
        <StatHelpText>{timeAgo(dragon.first_flight)}</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
}

function RocketInfo({ dragon }) {
  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      borderWidth="1px"
      mt="4"
      p="4"
      borderRadius="md"
    >
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Rocket
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>{dragon.name}</StatNumber>
      </Stat>

      <Stat>
        <StatLabel display="flex">
          <Box as={Tool} width="1em" />
          <Box ml="2" as="span">
            Heat Shield
          </Box>
          <StatNumber>{dragon.heat_shield.size_meters}</StatNumber>
          <StatHelpText>Material: {dragon.heat_shield.material}</StatHelpText>
        </StatLabel>
      </Stat>
    </SimpleGrid>
  );
}

function Gallery({ images }) {
  return (
    <SimpleGrid my="6" minChildWidth="350px" spacing="4">
      {images.map((image) => (
        <a href={image} key={image}>
          <Image src={image.replace("_o.jpg", "_z.jpg")} />
        </a>
      ))}
    </SimpleGrid>
  );
}
