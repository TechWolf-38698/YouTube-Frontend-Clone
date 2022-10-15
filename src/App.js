import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import { MyRouter } from "./components/Router/MyRouter";
import { LoginModal } from "./components/SmallComponents";
import { isMobile, isTablet } from "react-device-detect";

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
      {isMobile || isTablet ? (
        <>
          <div className="container-fluid">
            <div className="row align-items-center" style={{ height: "80vh" }}>
              <div className="col-12 text-center text-white">
                <p>Mobile Application is Under Development...</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <MyRouter />
          <LoginModal />
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
