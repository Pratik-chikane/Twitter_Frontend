import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId="783972841438-6l1jqf5231g19dhjb099hv5900m22mhe.apps.googleusercontent.com"
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
