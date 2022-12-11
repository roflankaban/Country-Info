import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import "./styles/App.css";
import SectionHeader from "./components/Header";
import PageCountrList from "./components/CountrList";
import PageSingleCountry from "./components/SingleCountry";
import SectionFooter from "./components/Footer";
import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store";

function App() {
  const mode: "light" | "dark" = useAppSelector(
      (state: RootState) => state.themeModeReducer
    );
  
  const theme = createTheme({
      palette: {
        mode,

              primary: { main: "#f16775" },
              secondary: { main: "#D0B8A8" },
              divider: "#DFD3C3",
              text: {
                primary: "#fee36e",
                secondary: "#fee36e",
              },
              background: { default: "#fff" },
            }
    });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SectionHeader />
          <Routes>
            <Route path="/">
              <Route path="" element={<PageCountrList />} />
              <Route path=":name" element={<PageSingleCountry />} />
            </Route>
          </Routes>
          <SectionFooter />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
