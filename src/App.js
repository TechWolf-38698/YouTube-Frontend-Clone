import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import { MyRouter } from "./components/Router/MyRouter";

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
      </ThemeProvider>
    </>
  );
}

export default App;
