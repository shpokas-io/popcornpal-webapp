import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Fade, Box, Typography, Button, Backdrop } from "@mui/material";
import { closeModal } from "../../features/movies/movieSlice";
import { Movie } from "../../features/movies/movieTypes";

interface MovieModalProps {
  isOpen: boolean;
  movie: Movie | null;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, movie }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isOpen}>
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
          {movie && (
            <>
              <Typography variant="h5" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {movie.description}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Genre: {movie.genre}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Release Date: {movie.release_date}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Rating: {movie.rating}
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
  );
};

export default MovieModal;
