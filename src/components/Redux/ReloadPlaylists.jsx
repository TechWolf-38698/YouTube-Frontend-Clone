var reload = false;

export const ReloadPlaylists = (state = reload, action) => {
  switch (action.type) {
    case "reloadPlaylists":
      return (state = action.payload);
    default:
      return state;
  }
};
