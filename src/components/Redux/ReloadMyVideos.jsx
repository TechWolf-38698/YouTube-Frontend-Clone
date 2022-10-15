var reload = false;

export const ReloadMyVideos = (state = reload, action) => {
  switch (action.type) {
    case "reloadMyVideos":
      return (state = action.payload);
    default:
      return state;
  }
};
