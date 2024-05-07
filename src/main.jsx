import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./context/CryptoContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CryptoContext>
  </React.StrictMode>
);
