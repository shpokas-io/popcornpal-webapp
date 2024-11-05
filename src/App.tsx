import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { store } from "./app/store";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import { useAppSelector } from "./hooks/hooks";

const App: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={token ? <MainPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
