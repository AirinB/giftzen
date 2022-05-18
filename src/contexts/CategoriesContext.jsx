import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../firebase/database';

export const CategoriesContext = React.createContext({
  isLoading: false,
  categories: [],
  categoriesByName: {},
});

export const useCategories = () => useContext(CategoriesContext);

const CategoriesContextProvider = CategoriesContext.Provider;

export const CategoriesContextWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(setCategories).finally(() => setIsLoading(false));
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
      value={{
        categories,
        isLoading,
        categoriesByName: getCategoriesByName(categories),
      }}
    >
      {children}
    </CategoriesContextProvider>
  );
};

CategoriesContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
