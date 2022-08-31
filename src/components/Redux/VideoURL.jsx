const URL = null;

const VideoURL = (state = URL, action) => {
  switch (action.type) {
    case "setVideoURL":
      return (state = action.payload);
    case "resetVideoURL":
      return (state = null);
    default:
      return state;
  }
};

export default VideoURL;
