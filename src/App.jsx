import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import MainPage from "./MainPage.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:sid" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
