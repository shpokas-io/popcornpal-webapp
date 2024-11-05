import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Login from "./pages/Login";
import { useAppSelector } from "./hooks/hooks";

const App: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Provider store={store}>
      {token ? <div>Authenticated Content</div> : <Login />}
    </Provider>
  );
};

export default App;
