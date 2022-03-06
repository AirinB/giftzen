import React, {useEffect, useState} from 'react'
import './App.css';
import OutlinedCard from "./components/BasicCard";
import CardsGrid from "./components/CardsGrid";

async function makeRequest() {
    return await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
}

function App() {
    const [values, setValues] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        makeRequest().then(setValues)
    }, []);

    return (
        <div className="App">
            {/*{*/}
            {/*    values.map(()=><OutlinedCard/> )*/}
            {/*}*/}
            <CardsGrid/>

        </div>
    );
}

export default App;
