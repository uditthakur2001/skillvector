import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ✅ APPLY THEME BEFORE REACT
const savedTheme = localStorage.getItem("theme");

const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const root = document.documentElement;

// reset
root.classList.remove("light-theme");

if (savedTheme === "light") {
  root.classList.add("light-theme");
} else if (savedTheme === "system") {
  root.classList.toggle("light-theme", !systemDark);
} else {
  // default = dark (your design)
  root.classList.toggle("light-theme", false);
}

createRoot(document.getElementById("root")!).render(<App />);
