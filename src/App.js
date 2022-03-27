import React from 'react'
import './App.css';
import { Outlet } from "react-router-dom";
import MyTabs from "./components/MyTabs";
import {AuthProvider} from "./contexts/AuthContext";


function App() {
    return (
        <div className="App">
            {/*TODO create private route*/}
            <AuthProvider>
            <MyTabs/>
            <Outlet />
            <span>&nbsp;&nbsp;&nbsp;</span>
            </AuthProvider>
        </div>
    );
}

export default App;
