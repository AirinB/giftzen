import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import MyTabs from "./components/MyTabs";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoriesContextWrapper } from "./contexts/CategoriesContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CategoriesContextWrapper>
          <MyTabs />
          <Outlet />
          <span>&nbsp;&nbsp;&nbsp;</span>
        </CategoriesContextWrapper>
      </AuthProvider>
    </div>
  );
}

export default App;
