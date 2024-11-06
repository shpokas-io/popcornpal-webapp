import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchMovies } from "../features/movies/movieSlice";
import logo from "../assets/images/logo-nobc.png";

interface Movie {
  id: string | number;
  title: string;
  description: string;
  poster_url?: string;
  genre?: string;
  release_date?: string;
  rating?: number;
}

const MoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);
  const moviesPerPage = 8;

  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setOpen(false);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const filteredMovies = movies.filter((movies) =>
    movies.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedMovies = filteredMovies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

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

      {/* Loading and Error MEssages */}
      {loading && <Typography>Loading movies...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Movie Grid */}
      <Grid container spacing={4}>
        {displayedMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
              onClick={() => handleOpenModal(movie)}
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
          count={Math.ceil(filteredMovies.length / moviesPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Movie details modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
