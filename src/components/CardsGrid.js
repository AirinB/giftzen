import * as React from "react";
import styled from 'styled-components'
import {useEffect, useState} from "react";
import RecipeReviewCard from "./ComplexCard";

const CardsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  align-items: stretch;`


async function makeRequest(resource) {
    return await fetch(`https://amazon-mock-server.vercel.app/api/${resource}`)
        .then(res => res.json())
}


export default function CardsGrid(props) {
    const [values, setValues] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        makeRequest(props.resource).then(setValues)
    }, []);
    return (
        <CardsGridStyled>
            {
                // values.map((data)=><OutlinedCard id={data.id} title= {data.title} price={data.price}
                //                                  description={data.description} image={data.image} rating={data.rating.rate}
                //                                  count={data.rating.count}/> )

                values.map((data)=><RecipeReviewCard image={data.image} title={data.title} price={data.price}/> )
            }
        </CardsGridStyled>
            );
}
