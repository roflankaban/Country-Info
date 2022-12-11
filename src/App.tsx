import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode, Box } from "@mui/material";

import "./styles/App.css";
import SectionHeader from "./components/Header";
import PageHome from "./pages/Home";
import PageCountry from "./pages/Country";
import SectionFooter from "./components/Footer";
import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store";

function App() {
  const mode: PaletteMode = useAppSelector(
    (state: RootState) => state.theme.mode
  );

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#373e98" },
            secondary: { main: "#fee36e" },
            divider: "#DFD3C3",
            text: {
              primary: "#373e98",
              secondary: "#373e98",
            },
            background: { default: "#f16775" },
          }
        : {
            primary: { main: "#4cbfa6" },
            secondary: { main: "#301008" },
            divider: "#f6ebf4",
            text: {
              primary: "#f6ebf4",
              secondary: "#f6ebf4",
            },
            background: { default: "#051622" },
          }),
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box
            sx={{
              bgcolor: "background.default",
              height: "100vh;",
              transition: "0.5s",
            }}
          >
            <SectionHeader />
            <Routes>
              <Route path="/">
                <Route path="/" element={<PageHome />} />
                <Route path="/:name" element={<PageCountry />} />
              </Route>
            </Routes>
            <SectionFooter />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
