import React, { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";

const initialState = {
  favoriteLaunches: localStorage.getItem("favoriteLaunches")
    ? JSON.parse(localStorage.getItem("favoriteLaunches"))
    : [],
  favoriteLaunchPads: localStorage.getItem("favoriteLaunchPads")
    ? JSON.parse(localStorage.getItem("favoriteLaunchPads"))
    : [],
};

export const GlobalContext = createContext(initialState);

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "favoriteLaunches",
      JSON.stringify(state.favoriteLaunches)
    );
    localStorage.setItem(
      "favoriteLaunchPads",
      JSON.stringify(state.favoriteLaunchPads)
    );
  }, [state]);

  const addToFavoritesLaunches = (launch) => {
    dispatch({ type: "ADD_LAUNCH_TO_FAVORITES", payload: launch });
  };

  const addToFavoritesLaunchPads = (launchpad) => {
    dispatch({ type: "ADD_LAUNCHPAD_TO_FAVORITES", payload: launchpad });
  };

  const removeFromFavoritesLaunches = (launch) => {
    dispatch({
      type: "REMOVE_LAUNCH_FROM_FAVORITES",
      payload: launch.flight_number,
    });
  };

  const removeFromFavoritesLaunchPads = (launchpad) => {
    dispatch({
      type: "REMOVE_LAUNCHPADS_FROM_FAVORITES",
      payload: launchpad.id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        favoriteLaunches: state.favoriteLaunches,
        favoriteLaunchPads: state.favoriteLaunchPads,
        addToFavoritesLaunches,
        addToFavoritesLaunchPads,
        removeFromFavoritesLaunches,
        removeFromFavoritesLaunchPads,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
