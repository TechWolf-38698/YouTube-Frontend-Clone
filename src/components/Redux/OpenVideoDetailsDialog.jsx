const open = false;

const OpenVideoDetailsDialog = (state = open, action) => {
  switch (action.type) {
    case "openVideoDetailsDialog":
      return (state = true);
    case "closeVideoDetailsDialog":
      return (state = false);
    default:
      return state;
  }
};

export default OpenVideoDetailsDialog;
