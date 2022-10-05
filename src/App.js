import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import { MyRouter } from "./components/Router/MyRouter";
import { LoginModal } from "./components/SmallComponents";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <MyRouter />
        <LoginModal />
      </ThemeProvider>
    </>
  );
}

export default App;
