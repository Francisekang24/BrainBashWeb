import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import Play from "./game_modes/Play";
import Classic from "./game_modes/Classic";
import Versus from "./game_modes/Versus";
import Endless from "./game_modes/Endless";
import Timed from "./game_modes/Timed";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/modes/Modes" element={<Play />} />
      <Route path="/modes/Classic" element={<Classic />} />
      <Route path="/modes/Timed" element={<Timed />} />
      <Route path="/modes/Endless" element={<Endless />} />
      <Route path="/modes/Versus" element={<Versus />} />
    </Routes>
  </BrowserRouter>
);
