import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// reset
root.classList.remove("light-theme");

// apply theme
if (savedTheme === "light") {
  root.classList.add("light-theme");
} else if (savedTheme === "dark") {
  // do nothing → dark is default
} else {
  // 👇 THIS is the missing part (system default)
  root.classList.toggle("light-theme", !systemDark);
}

createRoot(document.getElementById("root")!).render(<App />);