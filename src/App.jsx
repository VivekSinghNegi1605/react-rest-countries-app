import Layout from "./pages/Layout.jsx";
import Countries from "./components/Countries";
import AboutCountry from "./components/AboutCountry.jsx";
import UseLocalStorage from "./components/UseLocalStorage.jsx";

import { ThemeContext } from "./components/Context.jsx";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Countries />} />
        <Route path="about/:cca3" element={<AboutCountry />} />
      </Route>
    )
  );
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default App;
