import React, { useContext } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import MyTabs from "../components/MyTabs";
import { CategoriesContext } from "../contexts/CategoriesContext";

function App() {
  return <Outlet />;
}

export default App;
