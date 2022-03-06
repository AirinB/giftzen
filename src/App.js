import React from 'react'
import './App.css';
import CardsGrid from "./components/CardsGrid";
import NavTabs from "./components/NavTabs";


function App() {
    return (
        <div className="App">
            <NavTabs/>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <CardsGrid/>
        </div>
    );
}

export default App;
