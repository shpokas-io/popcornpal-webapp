import React from "react";
import { Typography, Box } from "@mui/material";
import logo from "../../assets/images/logo-nobc.png";

const welcomeMessages = [
  "Welcome back, Time to dive into someone else’s drama for a change.",
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

const WelcomeMessage: React.FC = () => {
  const randomMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Box
        component="img"
        src={logo}
        alt="App Logo"
        sx={{ width: 150, marginBottom: 2 }}
      />
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        width="90%"
        mt={2}
      >
        <Typography variant="h4">{randomMessage}</Typography>
      </Box>
    </Box>
  );
};

export default WelcomeMessage;
