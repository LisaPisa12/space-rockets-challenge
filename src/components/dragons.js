import React, { useContext } from "react";
import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
} from "@chakra-ui/core";
import { formatDragonLaunchDate } from "../utils/format-date";
import { Link } from "react-router-dom";
import { Watch } from "react-feather";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";

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
          {dragon.active ? (
            <Badge px="2" variant="solid" variantColor="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {dragon.name} &bull; {dragon.type}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {dragon.name}
        </Box>
        <Flex>
          <Text fontSize="sm">
            {formatDragonLaunchDate(dragon.first_flight)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
