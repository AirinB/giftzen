import React from 'react'
import './App.css';
import { Outlet } from "react-router-dom";
import MyTabs from "./components/MyTabs";


function App() {
    return (
        <div className="App">
            <MyTabs/>
            <Outlet />
            <span>&nbsp;&nbsp;&nbsp;</span>
        </div>
    );
}

export default App;
