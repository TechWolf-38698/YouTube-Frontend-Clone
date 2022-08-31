const theaterMode = false;

const TheaterMode = (state = theaterMode, action) => {
  switch (action.type) {
    case "theaterMode":
      return (state = !state);
    default:
      return state;
  }
};

export default TheaterMode;
