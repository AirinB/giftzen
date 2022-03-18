import * as React from "react";
import styled from 'styled-components'
import {useEffect, useState} from "react";
import RecipeReviewCard from "./ComplexCard";
import ShopProductCard from "./ProductCard";

const CardsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding-right:25px;
  padding-left:25px;
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
    }, [props.resource]);
    return (
        <CardsGridStyled>
            {
                values.map((data)=><ShopProductCard  name={data.name} cover={data.image} price={data.prices.current_price}
                                                     status={"done"} priceSale={data.prices.previous_price} rating={data.reviews.stars}
                link={data.full_link} prime={data.prime}/>)
            }
        </CardsGridStyled>
            );
}
