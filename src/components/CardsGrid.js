import OutlinedCard from './BasicCard'
import * as React from "react";
import styled from 'styled-components'
import {useEffect, useState} from "react";

const CardsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  align-items: stretch;`


async function makeRequest() {
    return await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
}


export default function CardsGrid() {
    const [values, setValues] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        makeRequest().then(setValues)
    }, []);
    return (
        <CardsGridStyled>
            {
                values.map(()=><OutlinedCard/> )
            }
        </CardsGridStyled>
            );
}
