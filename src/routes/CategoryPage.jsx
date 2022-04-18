import CardsGrid from "../components/CardsGrid";
import StyledButton from "../components/StyledButton";
import React, { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { Navigate, useParams } from "react-router-dom";
import { capitalize } from "@mui/material";

export default function CategoryPage() {
  const { categoriesByName } = useContext(CategoriesContext);
  const params = useParams();
  const { categoryName } = params;
  const categoryExists = !!categoriesByName[categoryName];
  if (!categoryExists) {
    return <Navigate to="/404" />;
  }
  return (
    <>
      <h2>{capitalize(categoryName)}</h2>
      <StyledButton categoryName={categoryName} />
      <CardsGrid categoryId={categoriesByName[categoryName]} />
    </>
  );
}
