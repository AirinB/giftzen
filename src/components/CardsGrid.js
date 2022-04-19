import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ShopProductCard from "./ProductCard";
import { getGiftsByCategoryId } from "../firebase/database";

export const CardsGridStyled = styled.div`
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
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState([]);
  useEffect(() => {
    if (!categoryId) return;
    setIsLoading(true);

    getGiftsByCategoryId(categoryId, setValues).then(() => {
      setIsLoading(false);
    });
  }, [categoryId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <CardsGridStyled>
      {values.map((data) => (
        <ShopProductCard product={data} />
      ))}
    </CardsGridStyled>
  );
}
