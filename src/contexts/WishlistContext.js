import React, { useContext, useEffect, useState } from "react";
import { getWishlistById, getWishlists } from "../firebase/database";
import { AuthContext } from "./AuthContext";
import { useMatch, useParams } from "react-router-dom";
import { usePublicPages } from "../hooks/publicPages";

export const WishlistsContext = React.createContext({
  wishlists: [],
});

const WishlistsContextProvider = WishlistsContext.Provider;

export const WishlistsContextWrapper = ({ children }) => {
  const isPublic = usePublicPages();
  const match = useMatch("/public/wishlists/:wishlistId");
  const [wishlists, setWishlists] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { uid: userId } = currentUser || {};

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
