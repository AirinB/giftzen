import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getWishlistById, getWishlists } from '../firebase/database';
import { useMatch } from 'react-router-dom';
import { usePublicPages } from '../hooks/publicPages';

export const WishlistsContext = React.createContext({
  wishlists: [],
});

const WishlistsContextProvider = WishlistsContext.Provider;

export const WishlistsContextWrapper = ({ children }) => {
  const isPublic = usePublicPages();
  const match = useMatch('/public/wishlists/:wishlistId');
  const [wishlists, setWishlists] = useState([]);

  const { wishlistId } = match ? match.params : {};

  useEffect(() => {
    if (isPublic && wishlistId) {
      getWishlistById(wishlistId, setWishlists);
    }
    getWishlists(setWishlists);
  }, [isPublic, wishlistId]);

  return (
    <WishlistsContextProvider
      value={{
        wishlists,
      }}
    >
      {children}
    </WishlistsContextProvider>
  );
};

WishlistsContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
