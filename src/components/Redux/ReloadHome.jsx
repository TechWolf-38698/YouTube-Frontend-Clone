var reload = false;

export const ReloadHome = (state = reload, action) => {
  switch (action.type) {
    case "reloadHome":
      return (state = !state);
    default:
      return state;
  }
};
