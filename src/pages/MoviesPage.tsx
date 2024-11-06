import React, { useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Button,
  Modal,
  Fade,
  Backdrop,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  fetchMovies,
  setSortOption,
  setSearchTerm,
  setPage,
  openModal,
  closeModal,
  selectFilteredSortedMovies,
} from "../features/movies/movieSlice";
import logo from "../assets/images/logo-nobc.png";

const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    sortOption,
    searchTerm,
    selectedMovie,
    isModalOpen,
    currentPage,
  } = useSelector((state: RootState) => state.movies);
  const movies = useSelector(selectFilteredSortedMovies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortOption(event.target.value as string));
  };

  return (
    <Container>
      {/* Logo */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4}
        mb={4}
      >
        <img
          src={logo}
          alt="PopcornPal Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <Typography
          variant="h6"
          color="textSecondary"
          textAlign="center"
          gutterBottom
        >
          "Prepare for movie overload! You're about to enter a world where
          popcorn is a food group and reality is optional."
        </Typography>
      </Box>

      {/* Search Bar */}
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      {/* Sorting Dropdown */}
      <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
        <Select value={sortOption} onChange={handleSortChange}>
          <MenuItem value="title">Sort by Title(A-Z)</MenuItem>
          <MenuItem value="release_date">Sort by Release Date</MenuItem>
          <MenuItem value="rating">Sort by Rating</MenuItem>
        </Select>
      </Box>

      {/* Loading and Error MEssages */}
      {loading && <Typography>Loading movies...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Movie Grid */}
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
              onClick={() => dispatch(openModal(movie))}
            >
              <CardMedia
                component="img"
                height="300"
                image={
                  movie.poster_url || "https://via.placeholder.com/300x450"
                }
                alt={movie.title}
              />
              <CardContent sx={{ height: 100, overflow: "hidden" }}>
                <Typography variant="h6" noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {movie.description}
                </Typography>
              </CardContent>

              <Box textAlign="center" mb={2}>
                <Button variant="contained" color="primary" size="small">
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(movies.length / moviesPerPage)}
          page={currentPage}
          onChange={(_, value) => dispatch(setPage(value))}
          color="primary"
        />
      </Box>

      {/* Movie details modal */}
      <Modal
        open={isModalOpen}
        onClose={() => dispatch(closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
          >
            {selectedMovie && (
              <>
                <Typography variant="h5" gutterBottom>
                  {selectedMovie.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {selectedMovie.description}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Genre: {selectedMovie.genre}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Release Date: {selectedMovie.release_date}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  Rating: {selectedMovie.rating}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Add to Favorites
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default MoviesPage;
