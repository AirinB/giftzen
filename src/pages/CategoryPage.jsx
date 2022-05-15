import CardsGrid from '../components/CardsGrid';
import AddGiftButton from '../components/AddGiftButton';
import React, { useContext } from 'react';
import { CategoriesContext } from '../contexts/CategoriesContext';
import { Navigate, useParams } from 'react-router-dom';
import { capitalize } from '@mui/material';

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
      <AddGiftButton categoryName={categoryName} />
      <CardsGrid categoryId={categoriesByName[categoryName]} />
    </>
  );
}
