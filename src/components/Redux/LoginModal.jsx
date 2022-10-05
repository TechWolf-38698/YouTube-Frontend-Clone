// let data = {
//   open: true,
//   title: "Hello World",
//   subtitle: "I am the best"
// };
let data = null;
export default function LoginModal(state = data, action) {
  switch (action.type) {
    case "openLoginModal":
      state = action.payload;
      return state;
    case "closeLoginModal":
      state = null;
      return state;
    default:
      return state;
  }
}
