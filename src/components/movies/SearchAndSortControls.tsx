import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSortOption } from "../../features/movies/movieSlice";
import { RootState } from "../../app/store";

const SearchAndSortControls: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, sortOption } = useSelector(
    (state: RootState) => state.movies
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortOption(event.target.value as string));
  };

  return (
    <Box>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
        <Select value={sortOption} onChange={handleSortChange}>
          <MenuItem value="title">Sort by Title(A-Z)</MenuItem>
          <MenuItem value="release_date">Sort by Release Date</MenuItem>
          <MenuItem value="rating">Sort by Rating</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default SearchAndSortControls;
