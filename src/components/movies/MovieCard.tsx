import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Movie } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  addFavorite,
  removeFavorite,
  openModal,
} from "../../features/movies/movieSlice";

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite = false }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleFavoriteToggle = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      if (isFavorite) {
        await dispatch(removeFavorite(String(movie.id)));
      } else {
        await dispatch(addFavorite(String(movie.id)));
      }
    } catch (error) {
      console.error(
        `Error ${isFavorite ? "removing from" : "adding to"} favorites:`,
        error
      );
    }
  };

  return (
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
      <Box textAlign="center" mb={2}>
        <Button
          variant="contained"
          color={isFavorite ? "secondary" : "primary"}
          size="small"
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() =>
            dispatch(openModal({ ...movie, id: String(movie.id) }))
          }
          sx={{ ml: 1 }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default MovieCard;
