import React from 'react'
import BasicCard from "./BasicCard";

import './App.css';

function App() {
  return (
    <div className="App" style={{ display: 'grid', justifyContent: 'center', contextAlign: 'center', gap: '4px',
        gridoutFlow: 'column'}}>
     <BasicCard/>
     <BasicCard/>
    </div>
  );
}

export default App;
