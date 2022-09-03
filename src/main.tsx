import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/browser";
import App from "./App";
import { getEnvironment } from "./utils/general";

const env = getEnvironment();

if (env !== "development") {
  Sentry.init({
    dsn: import.meta.env.VITE_ERROR_DSN,
    environment: env,
    release: `rmg-utils@${APP_VERSION}`,
    autoSessionTracking: false,
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
