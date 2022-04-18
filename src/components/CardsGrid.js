import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ShopProductCard from "./ProductCard";
import { getGiftsByCategoryId } from "../firebase/detabase";

const CardsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding-right: 25px;
  padding-left: 25px;
  grid-gap: 20px;
  align-items: stretch;
`;

// const baseUrl =  'https://amazon-mock-server.vercel.app'
// const baseUrl =  'http://localhost:8080'

// async function makeRequest(resource) {
//   return await fetch(`${baseUrl}/api/${resource}`).then((res) => res.json());
// }

export default function CardsGrid({ categoryId }) {
  const [values, setValues] = useState([]);
  useEffect(() => {
    console.log({ categoryId });
    if (!categoryId) return;

    getGiftsByCategoryId(categoryId, setValues);
  }, [categoryId]);
  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  // Update the document title using the browser API
  // makeRequest(props.resource).then(setValues)
  // }, [props.resource]);
  console.log(values);
  return (
    <CardsGridStyled>
      {values.map((data) => (
        <ShopProductCard
          name={data.name}
          cover={data.image}
          price={data.prices.current_price}
          status={"done"}
          priceSale={data.prices.previous_price}
          rating={data.reviews.stars}
          link={data.full_link}
          prime={data.prime}
        />
      ))}
    </CardsGridStyled>
  );
}
