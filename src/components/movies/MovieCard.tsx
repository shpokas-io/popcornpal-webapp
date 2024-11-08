import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addFavorite, removeFavorite } from "../../features/movies/movieThunks";
import { openModal } from "../../features/movies/movieSlice";
import { Movie } from "../../features/movies/movieTypes";

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  showButtons?: boolean;
  disableSnackbar?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite = false,
  showButtons = true,
  disableSnackbar = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);

  const handleFavoriteToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isFavoriteState) {
      dispatch(removeFavorite(String(movie.id)));
    } else {
      dispatch(addFavorite(String(movie.id)));
      if (!disableSnackbar) setOpenSnackbar(true);
    }
    setIsFavoriteState(!isFavoriteState);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card
        sx={{
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": { transform: "scale(1.05)", boxShadow: 3 },
        }}
        onClick={() => dispatch(openModal({ ...movie, id: String(movie.id) }))}
      >
        <CardMedia
          component="img"
          height="300"
          image={movie.poster_url || "https://via.placeholder.com/300x450"}
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

        {showButtons && (
          <Box textAlign="center" mb={2}>
            <Button
              variant="contained"
              color={isFavoriteState ? "secondary" : "primary"}
              size="small"
              onClick={handleFavoriteToggle}
            >
              {isFavoriteState ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                dispatch(openModal({ ...movie, id: String(movie.id) }));
              }}
              sx={{ ml: 1 }}
            >
              View Details
            </Button>
          </Box>
        )}
      </Card>

      {!disableSnackbar && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Movie added to favorites!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default MovieCard;
