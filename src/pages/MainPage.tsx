import React from "react";
import WelcomeMessage from "../components/utils/WelcomeMessage";
import MoviesCarousel from "../components/movies/MoviesCarousel";

const MainPage: React.FC = () => {
  return (
    <>
      <WelcomeMessage />
      <MoviesCarousel />
    </>
  );
};

export default MainPage;
