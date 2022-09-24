const open = false;

const OpenPlaylistAdd = (state = open, action) => {
  switch (action.type) {
    case "OpenPlaylistAdd":
      state = true;
      return state;
    case "ClosePlaylistAdd":
      state = false;
      return state;
    default:
      return state;
  }
};

export default OpenPlaylistAdd;
