const URL = null;

const VideoURL = (state = URL, action) => {
  switch (action.type) {
    case "setVideoURL":
      state = action.payload;
      return state;
    case "resetVideoURL":
      state = null;
      return state;
    default:
      return state;
  }
};

export default VideoURL;
