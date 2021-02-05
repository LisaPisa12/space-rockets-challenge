/* eslint-disable default-case */
export default (state, action) => {
  switch (action.type) {
    case "ADD_LAUNCH_TO_FAVORITES":
      return {
        ...state,
        favoriteLaunches: [action.payload, ...state.favoriteLaunches],
      };
    case "ADD_LAUNCHPAD_TO_FAVORITES":
      return {
        ...state,
        favoriteLaunchPads: [action.payload, ...state.favoriteLaunchPads],
      };
    case "REMOVE_LAUNCH_FROM_FAVORITES":
      return {
        ...state,
        favoriteLaunches: state.favoriteLaunches.filter(
          (launch) => launch.flight_number !== action.payload
        ),
      };
    case "REMOVE_LAUNCHPADS_FROM_FAVORITES":
      return {
        ...state,
        favoriteLaunchPads: state.favoriteLaunchPads.filter(
          (launchpad) => launchpad.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
