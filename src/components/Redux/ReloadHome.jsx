var reload = false;

export const ReloadHome = (state = reload, action) => {
  switch (action.type) {
    case "reloadHome":
      return (state = action.payload);
    default:
      return state;
  }
};
