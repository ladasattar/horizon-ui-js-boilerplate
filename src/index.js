import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "contexts/themeContext/ThemeContext";
import "./index.css";

import App from "./App";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
      <ToastContainer />
    </ThemeProvider>
  </BrowserRouter>
);
