import React, { useContext } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import MyTabs from "../components/MyTabs";
import { CategoriesContext } from "../contexts/CategoriesContext";

function App() {
  const { isLoading } = useContext(CategoriesContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <MyTabs />
      <Outlet />
      <span>&nbsp;&nbsp;&nbsp;</span>
    </div>
  );
}

export default App;
