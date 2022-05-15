import { CardsGridStyled } from "../components/CardsGrid";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { WishlistsContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import ShopProductCard from "../components/ProductCard";
import {
  getGiftsByWishlistId,
  getUserById,
  removeGiftFromWishlist,
} from "../firebase/database";
import { usePublicPages } from "../hooks/publicPages";
import { Tooltip } from "@mui/material";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { AlertsContext } from "../contexts/AlertsContext";
import IconButton from "@mui/material/IconButton";

export default function WishlistPage() {
  const { setMessage } = useContext(AlertsContext);
  const { wishlists } = useContext(WishlistsContext);
  const { currentUser } = useContext(AuthContext);
  const isPublicPage = usePublicPages();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState([]);
  const [wishlistAuthor, setWishlistAuthor] = useState(null);
  const { uid: userId } = currentUser || {};
  const { wishlistId } = params;

  const wishlist = wishlists[wishlistId];

  useEffect(() => {
    if (isPublicPage && wishlist) {
      getUserById(wishlist.userId, setWishlistAuthor);
    }
  }, [isPublicPage, wishlist]);

  useEffect(() => {
    setIsLoading(true);

    return getGiftsByWishlistId(wishlistId, (data) => {
      setValues(data);
      setIsLoading(false);
    });
  }, [getGiftsByWishlistId, userId, wishlistId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!wishlist) {
    return <Navigate to="/404" replace={false} />;
  }

  const getActions = (product) => {
    const handleRemoveFromWishlist = () => {
      console.log("should remove gift", wishlistId, product.id);
      removeGiftFromWishlist(wishlistId, product.id)
        .then(() => {
          setMessage("Gift removed from wishlist", "success");
        })
        .catch(() => {
          setMessage("Error removing gift from wishlist", "error");
        });
    };

    if (isPublicPage) {
      return null;
    }

    return (
      <IconButton onClick={handleRemoveFromWishlist}>
        <Tooltip title="Add to wishlist">
          <BookmarkRemoveIcon />
        </Tooltip>
      </IconButton>
    );
  };

  return (
    <>
      <h2>Wishlist: {wishlist.title}</h2>
      {!!wishlistAuthor && <h4>created by: {wishlistAuthor.name}</h4>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <CardsGridStyled>
          {values.map((data) => (
            <ShopProductCard
              getActions={() => getActions(data)}
              product={data}
            />
          ))}
        </CardsGridStyled>
      )}
    </>
  );
}
