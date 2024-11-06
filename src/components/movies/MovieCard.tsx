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
import { openModal } from "../../features/movies/movieSlice";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 3 },
      }}
      onClick={() => dispatch(openModal({ ...movie, id: Number(movie.id) }))}
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
        <Button variant="contained" color="primary" size="small">
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default MovieCard;
