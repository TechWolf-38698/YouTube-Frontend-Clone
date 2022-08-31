const user = null;

const LoggedInUser = (state = user, action) => {
  switch (action.type) {
    case "setLogin":
      return (state = action.payload);
    default:
      return state;
  }
};

export default LoggedInUser;
