import { Typography, Box, IconButton } from "@mui/material";
import logo from "../assets/images/logo-nobc.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { selectTopRatedMovies } from "../features/movies/movieSlice";
import MovieCard from "../components/movies/MovieCard";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const MainPage: React.FC = () => {
  const welcomeMessages = [
    "Welcome back, Time to dive into someone else`s drama for a change.",
    "Escaping reality, one movie at a time. We won’t tell.",
    "Forget your problems—get lost in someone else’s scripted misery!",
    "Let’s face it, the plot twists here are better than real life.",
    "Welcome! Just remember, movie magic won’t fix real life… yet.",
    "Reality is overrated. Let’s go somewhere fictional.",
    "Need to forget the outside world? We’ve got just the ticket.",
    "Movies: because reality is too real.",
    "Here’s hoping today’s films are less disappointing than real life.",
    "Escapism at its finest. Just… don’t look at the clock.",
  ];

  const randomMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const topRatedMovies = useSelector(selectTopRatedMovies);

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
          m: 0,
          p: 0,
          display: "flex",
          justifyContent: "center",
          color: "#e0e0e0",
          "& li.slick-active button::before": {
            color: "#ffffff",
            opacity: 1,
          },
          "& button::before": {
            fontSize: "12px",
            color: "#e0e0e0",
            opacity: 0.75,
          },
        }}
      >
        {dots}
      </Box>
    ),
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <img
          src={logo}
          alt="App Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          width="90%"
          mt={2}
        >
          <Typography variant="h4">{randomMessage} </Typography>
        </Box>
      </Box>

      <Box mt={4} width="100%" display="flex" justifyContent="center">
        <Box width="90%" maxWidth="800px">
          {" "}
          <Typography variant="h5" align="center" gutterBottom>
            Top Rated Movies
          </Typography>
          <Slider {...settings}>
            {topRatedMovies.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  height: 600,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "auto",
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MovieCard movie={movie} />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
};

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

export default MainPage;
