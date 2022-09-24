const URL = null;

const OpenPlaylistModal = (state = URL, action) => {
  switch (action.type) {
    case "PlaylistModal":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default OpenPlaylistModal;
