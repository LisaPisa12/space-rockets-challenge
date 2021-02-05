import React, { useContext } from "react";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { formatDragonLaunchDate } from "../utils/format-date";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { GlobalContext } from "../Context/GlobalState";
import { Tooltip } from "@chakra-ui/react";

const PAGE_SIZE = 12;

export default function Dragons() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/dragons",
    {
      limit: PAGE_SIZE,
    }
  );
  console.log(data, error);
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Dragons" }]} />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((dragon) => <DragonItem dragon={dragon} key={dragon.id} />)}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function DragonItem({ dragon }) {
  return (
    <Box
      as={Link}
      to={`/dragons/${dragon.id.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={dragon.flickr_images[0]}
        alt={`${dragon.name} dragon`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {dragon.name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          display="flex"
          justifyContent="space-between"
        >
          {dragon.name}
          {dragon.active ? (
            <Badge px="2" variant="solid" variantColor="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Not Active
            </Badge>
          )}
        </Box>
      </Box>
    </Box>
  );
}
