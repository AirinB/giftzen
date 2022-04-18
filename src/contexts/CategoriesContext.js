import React, { Component, useEffect, useState } from "react";
import { getCategories } from "../firebase/detabase";

export const CategoriesContext = React.createContext({
  categories: [],
  categoriesByName: {},
});

const CategoriesContextProvider = CategoriesContext.Provider;

export const CategoriesContextWrapper = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(setCategories);
  }, []);

  const getCategoriesByName = (categories) => {
    const categoriesByName = {};
    Object.entries(categories).forEach(([id, name]) => {
      categoriesByName[name] = id;
    });
    return categoriesByName;
  };

  return (
    <CategoriesContextProvider
      value={{ categories, categoriesByName: getCategoriesByName(categories) }}
    >
      {children}
    </CategoriesContextProvider>
  );
};
