import React from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from "@mui/icons-material/Search";
import StarRateIcon from '@mui/icons-material/StarRate';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import { toggleMode } from "../redux/reducers/themeMode";
import { PaletteMode } from "@mui/material";
import { searchCountries } from "../redux/reducers/countries";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));


export default function Header() {
  const dispatch = useAppDispatch();
  const mode: PaletteMode = useAppSelector(
    (state: RootState) => state.theme.mode
  );
  const favorites: number = useAppSelector(
    (state: RootState) => state.countries.favorites
  );
  const visited: number = useAppSelector(
    (state: RootState) => state.countries.visited
  );

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="" style={{ color: "inherit", textDecoration: "inherit" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => {
            dispatch(toggleMode());}}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton> 

          <Box sx={{ flexGrow: 1 }} />
           <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label={`show ${favorites} favorites`}
              color="inherit"
            >
              <Badge badgeContent={favorites} color="info">
                <StarRateIcon />
              </Badge>
            </IconButton>
          </Box> 
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => dispatch(searchCountries(e.target.value))}
              
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
