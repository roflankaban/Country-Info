import React, { useState, useEffect } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import { tCountry } from "../types/tCountry";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import searchReducer from "../redux/reducers/search";
import { fetchCountries, sortCountriesByName } from "../redux/reducers/countries";

function CountrList() {
  const countriesList = useAppSelector((state) => state.countriesReducer);
  const dispatch = useAppDispatch();
  useEffect(function () {
    dispatch(fetchCountries());
  }, []);

  const search: string = useAppSelector(
    (state: RootState) => state.searchReducer
  );
  const [order, setOrder] = useState<"asc" | "dsc">("asc");
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const emptyRows: number =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            countriesList.filter((cntry) => cntry.name.common.includes(search))
              .length
        )
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      {!countriesList.length && "Loading..."}
      <TableContainer>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow style={{ height: 50 }}>
              <TableCell >Flag</TableCell>
              <TableCell style={{ cursor: "pointer" }} onClick={()=>{dispatch(sortCountriesByName())}}>Country Name</TableCell>
              <TableCell >Rigion</TableCell>
              <TableCell >Subregion</TableCell>
              <TableCell >Capital</TableCell>
              <TableCell >Area</TableCell>
              <TableCell >Population</TableCell>
              <TableCell >Languages</TableCell>
              <TableCell align="center" >Location</TableCell>
              <TableCell >Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesList
              .filter((cntry) => cntry.name.common.includes(search))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cntry: tCountry) => (
                <TableRow key={cntry.name.official} style={{ height: 40 }}>
                  <TableCell>
                    <img height={30} src={cntry.flags.png} alt="" />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={cntry.name.common}
                    >
                      {cntry.name.official}
                    </Link>
                  </TableCell>
                  <TableCell>{cntry.region}</TableCell>
                  <TableCell> {cntry.subregion}</TableCell>
                  <TableCell>
                    {cntry.capital &&
                      new Intl.ListFormat("en").format(cntry.capital)}
                  </TableCell>
                  <TableCell>
                    {cntry.area} km<sup>2</sup>
                  </TableCell>
                  <TableCell>{cntry.population}</TableCell>
                  <TableCell>
                    {cntry.languages &&
                      new Intl.ListFormat("en").format(
                        Object.values(cntry.languages)
                      )}
                  </TableCell>
                  <TableCell>
                  <IconButton href={cntry.maps.googleMaps} target="_blanck" aria-label="delete" color="primary">
                      <LocationOnIcon/>
                  </IconButton>
                  </TableCell>
                  <TableCell>
                  <IconButton>
                      {false ? <StarRateIcon color="primary" /> :  <StarBorderIcon color="primary"/>}
                  </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 40 * emptyRows,
                }}
              >
                <TableCell />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 50, 250]}
                count={
                  countriesList.filter((cntry) =>
                    cntry.name.common.includes(search)
                  ).length
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CountrList;
