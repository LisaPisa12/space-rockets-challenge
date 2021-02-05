import React, { useContext } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { GlobalContext } from "../Context/GlobalState";

import { Box } from "@chakra-ui/react";

export default function FavoritesButton({ item, disableAdd, type }) {
  const {
    addToFavoritesLaunches,
    addToFavoritesLaunchPads,
    removeFromFavoritesLaunches,
    removeFromFavoritesLaunchPads,
  } = useContext(GlobalContext);

  return (
    <Box d="flex" mt="2" position="absolute" right={5} bottom={5}>
      {!disableAdd ? (
        <Tooltip label="Add to favorites" placement="top">
          <IconButton
            w={6}
            h={6}
            icon={<AddIcon />}
            onClick={
              type === "launch"
                ? () => {
                    addToFavoritesLaunches(item);
                  }
                : () => {
                    addToFavoritesLaunchPads(item);
                  }
            }
          />
        </Tooltip>
      ) : (
        <Tooltip label="Remove from favorites" placement="top">
          <IconButton
            w={6}
            h={6}
            icon={<MinusIcon />}
            onClick={
              type === "launch"
                ? () => {
                    removeFromFavoritesLaunches(item);
                  }
                : () => {
                    removeFromFavoritesLaunchPads(item);
                  }
            }
          />
        </Tooltip>
      )}
    </Box>
  );
}
