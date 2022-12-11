import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { tCountry } from "../../types/tCountry";
import { ICountriesReducer } from "../../types/ICountriesReducer";
import { fetchCountries, fetchCountry } from "../../functions/asyncThunk";

const initialState: ICountriesReducer = {
  countries: [],
  country: [],
  backUpCountries: [],
  loading: false,
  error: false,
  favorites: 0,
  visited: 0,
  sortDir: {
    byName: "asc",
    byRegion: "asc",
    bySubregion: "asc",
    byCapital: "asc",
    byAria: "asc",
    byPopulation: "asc",
    byLanguages: "asc",
    byFavorite: "asc",
    byVisited: "asc",
  },
};

const countriesSlicer = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addRemoveFavoriteCountry: function (
      state: ICountriesReducer,
      action: PayloadAction<string>
    ) {
      state.backUpCountries.forEach((country) => {
        if (country.name.official === action.payload) {
          country.isFavorite = !country.isFavorite;
        }
      });
      state.countries.forEach((country) => {
        if (country.name.official === action.payload) {
          country.isFavorite = !country.isFavorite;
        }
      });
      state.favorites = state.backUpCountries.filter(
        (country) => country.isFavorite
      ).length;
      localStorage.setItem("countries", JSON.stringify(state.backUpCountries));
      localStorage.setItem(
        "counter",
        JSON.stringify([state.favorites, state.visited])
      );
    },
    searchCountries: function (
      state: ICountriesReducer,
      action: PayloadAction<string>
    ) {
      state.countries = state.backUpCountries.filter((country) => {
        return (
          country.name.common +
          "|" +
          country.region +
          "|" +
          country.subregion +
          "|" +
          (country.capital ? country.capital : "") +
          "|" +
          (country.languages ? Object.values(country.languages).join(",") : "")
        )
          .toLowerCase()
          .includes(action.payload.toLowerCase().trim());
      });
    },
    sortCountriesByName: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.byName;
      if (sortDir === "desc") {
        state.countries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      } else {
        state.countries.sort((a, b) =>
          b.name.common.localeCompare(a.name.common)
        );
      }
      state.sortDir.byName = sortDir === "asc" ? "desc" : "asc";
    },
    sortCountriesByRegion: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.byRegion;
      if (sortDir === "desc") {
        state.countries.sort((a, b) => a.region.localeCompare(b.region));
      } else {
        state.countries.sort((a, b) => b.region.localeCompare(a.region));
      }
      state.sortDir.byRegion = sortDir === "asc" ? "desc" : "asc";
    },
    sortCountriesBySubregion: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.bySubregion;
      if (sortDir === "desc") {
        state.countries.sort((a, b) => {
          if (a.subregion && b.subregion) {
            return a.subregion.localeCompare(b.subregion);
          } else {
            return -1;
          }
        });
      } else {
        state.countries.sort((a, b) => {
          if (a.subregion && b.subregion) {
            return b.subregion.localeCompare(a.subregion);
          } else {
            return -1;
          }
        });
      }
      state.sortDir.bySubregion = sortDir === "asc" ? "desc" : "asc";
    },
    sortCountriesByCapital: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.byCapital;
      if (sortDir === "desc") {
        state.countries.sort((a, b) => {
          if (a.capital && b.capital) {
            return a.capital.join("").localeCompare(b.capital.join(""));
          } else {
            return -1;
          }
        });
      } else {
        state.countries.sort((a, b) => {
          if (a.capital && b.capital) {
            return b.capital.join("").localeCompare(a.capital.join(""));
          } else {
            return -1;
          }
        });
      }
      state.sortDir.byCapital = sortDir === "asc" ? "desc" : "asc";
    },
    sortCountriesByAria: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.byAria;
      if (sortDir === "desc") {
        state.countries.sort((a, b) => a.area - b.area);
      } else {
        state.countries.sort((a, b) => b.area - a.area);
      }
      state.sortDir.byAria = sortDir === "asc" ? "desc" : "asc";
    },
    sortCountriesByPopulation: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.byPopulation;
      if (sortDir === "desc") {
        state.countries.sort((a, b) => a.population - b.population);
      } else {
        state.countries.sort((a, b) => b.population - a.population);
      }
      state.sortDir.byPopulation = sortDir === "asc" ? "desc" : "asc";
    },
    sortCountriesByLanguages: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.byLanguages;
      if (sortDir === "desc") {
        state.countries.sort((a, b) => {
          if (a.languages && b.languages) {
            return Object.values(a.languages)
              .join("")
              .localeCompare(Object.values(b.languages).join(""));
          } else {
            return -1;
          }
        });
      } else {
        state.countries.sort((a, b) => {
          if (a.languages && b.languages) {
            return Object.values(b.languages)
              .join("")
              .localeCompare(Object.values(a.languages).join(""));
          } else {
            return -1;
          }
        });
      }
      state.sortDir.byLanguages = sortDir === "asc" ? "desc" : "asc";
    },
    sortCountriesByFavorite: function (state: ICountriesReducer) {
      const sortDir = state.sortDir.byFavorite;
      if (sortDir === "desc") {
        state.countries.sort((a, b) => {
          return a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1;
        });
      } else {
        state.countries.sort((a, b) => {
          return a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? 1 : -1;
        });
      }
      state.sortDir.byFavorite = sortDir === "asc" ? "desc" : "asc";
    },
  },
  extraReducers: (build) => {
    build
      .addCase(
        fetchCountries.fulfilled,
        (state: ICountriesReducer, action: PayloadAction<tCountry[]>) => {
          state.backUpCountries = localStorage.getItem("countries")
            ? JSON.parse(localStorage.getItem("countries")!)
            : action.payload;
          state.countries = state.backUpCountries.filter(() => true);
          state.loading = false;
          if (localStorage.getItem("counter")) {
            [state.favorites, state.visited] = JSON.parse(
              localStorage.getItem("counter")!
            );
          }
        }
      )
      .addCase(fetchCountries.pending, (state: ICountriesReducer) => {
        state.loading = true;
      })
      .addCase(fetchCountries.rejected, (state: ICountriesReducer) => {
        state.loading = false;
        state.error = true;
      });
    build
      .addCase(
        fetchCountry.fulfilled,
        (state: ICountriesReducer, action: PayloadAction<tCountry[]>) => {
          state.country = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCountry.pending, (state: ICountriesReducer) => {
        state.loading = true;
      })
      .addCase(fetchCountry.rejected, (state: ICountriesReducer) => {
        state.loading = false;
        state.error = true;
      });
  },
});

const countriesReducer = countriesSlicer.reducer;
export const {
  searchCountries,
  sortCountriesByName,
  sortCountriesByRegion,
  sortCountriesByCapital,
  sortCountriesBySubregion,
  sortCountriesByAria,
  sortCountriesByPopulation,
  sortCountriesByLanguages,
  addRemoveFavoriteCountry,
  sortCountriesByFavorite,
} = countriesSlicer.actions;
export default countriesReducer;
