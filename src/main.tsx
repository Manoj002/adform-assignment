import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import appStore from "./store/appStore.ts";
import SnackBar from "./components/Snackbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
      <SnackBar />
    </Provider>
  </StrictMode>
);
