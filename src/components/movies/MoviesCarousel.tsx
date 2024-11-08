import React, { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import MovieCard from "./MovieCard";
import { Movie } from "../../features/movies/movieTypes";
import { selectTopRatedMovies } from "../../features/movies/movieSelectors";
import { useSelector } from "react-redux";
import { fetchMovies } from "../../features/movies/movieThunks";
import { useAppDispatch } from "../../hooks/hooks";

const CustomArrow = ({
  direction,
  onClick,
}: {
  direction: string;
  onClick?: () => void;
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [direction === "left" ? "left" : "right"]: -40,
      color: "white",
      bgcolor: "rgba(0,0,0,0.5)",
      "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
      zIndex: 1,
    }}
  >
    {direction === "left" ? <ArrowBackIos /> : <ArrowForwardIos />}
  </IconButton>
);

const MoviesCarousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const topRatedMovies = useSelector(selectTopRatedMovies);

  useEffect(() => {
    if (topRatedMovies.length === 0) {
      dispatch(fetchMovies());
    }
  }, [topRatedMovies.length, dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    appendDots: (dots: React.ReactNode) => (
      <Box
        component="ul"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#ffffff",
          "& li": {
            margin: "0 5px",
          },
          "& button::before": {
            fontSize: "50px",
            color: "#ffffff",
            opacity: 0.85,
          },
          "& li.slick-active button::before": {
            color: "#ffffff",
            opacity: 1,
          },
        }}
      >
        {dots}
      </Box>
    ),
  };

  return (
    <Box mt={4} width="100%" display="flex" justifyContent="center">
      <Box width="90%" maxWidth="700px" padding="16px">
        <Typography variant="h5" align="center" gutterBottom>
          Top Rated Movies
        </Typography>
        <Slider {...settings}>
          {topRatedMovies.map((movie: Movie) => (
            <Box
              key={movie.id}
              sx={{
                height: 450,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  padding: "8px",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <MovieCard
                  movie={movie}
                  showButtons={false}
                  sx={{
                    height: "100%",
                    maxWidth: "100%",
                    "& img": {
                      objectFit: "cover",
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default MoviesCarousel;
