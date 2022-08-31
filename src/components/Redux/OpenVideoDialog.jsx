const openVideoDialog = false;

const OpenVideoDialog = (state = openVideoDialog, action) => {
  switch (action.type) {
    case "openVideoDialog":
      return (state = true);
    case "closeVideoDialog":
      return (state = false);
    default:
      return state;
  }
};

export default OpenVideoDialog;
