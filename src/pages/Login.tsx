import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginUser } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import useLoginForm from "../features/auth/useLoginForm";
import { useEffect } from "react";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const { email, setEmail, password, setPassword, handleSubmit } = useLoginForm(
    () => {
      dispatch(loginUser({ email, password }));
    }
  );

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "login"}
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default Login;
