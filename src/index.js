import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherSearch from "./WeatherSearch";

import "./App.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <div className="App">
      <h1>Weather App</h1>
      <WeatherSearch />
      <a
        href="https://github.com/Leterraa/react-weather-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open-source code
      </a>{" "}
      by Valeriia Teplynska;
    </div>
  </StrictMode>
);
