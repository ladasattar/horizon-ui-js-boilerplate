import React, { useEffect, useState } from "react";
import ThemeContext from ".";

const ThemeProvider = (props) => {
  const localTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
    theme === "light"
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  };

  const toggleBodyClass = () => {
    if (localTheme !== "dark") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  useEffect(() => {
    toggleBodyClass();
  }, [localStorage.getItem("theme"), theme]);

  useEffect(() => {
    localTheme && setTheme(localTheme);
    toggleBodyClass();
  }, []);

  return (
    <ThemeContext.Provider value={{ ...props, theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
