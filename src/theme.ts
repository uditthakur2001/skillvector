export const setTheme = (theme: "light" | "dark" | "system") => {
  const root = document.documentElement;

  // always reset first
  root.classList.remove("light-theme");

  if (theme === "light") {
    root.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  }

  if (theme === "dark") {
    localStorage.setItem("theme", "dark");
  }

  if (theme === "system") {
    localStorage.removeItem("theme");

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    root.classList.toggle("light-theme", !systemDark);
  }
};


export const initThemeListener = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("light-theme", !e.matches);
      }
    });
};