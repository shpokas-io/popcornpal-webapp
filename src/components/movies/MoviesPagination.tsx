import React from "react";
import { Box, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import {
  setPage,
  selectFilteredMoviesCount,
} from "../../features/movies/movieSlice";
import { RootState } from "../../app/store";

const MoviesPagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalFilteredMovies = useSelector(selectFilteredMoviesCount);
  const { currentPage, moviesPerPage } = useSelector(
    (state: RootState) => state.movies
  );

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={Math.ceil(totalFilteredMovies / moviesPerPage)}
        page={currentPage}
        onChange={(_, value) => dispatch(setPage(value))}
        color="primary"
      />
    </Box>
  );
};

export default MoviesPagination;
