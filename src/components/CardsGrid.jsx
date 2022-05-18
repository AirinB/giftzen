import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import ShopProductCard from './ProductCard';
import { addGiftToWishlist, deleteGiftById, getGiftsByCategoryId } from '../firebase/database';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DropDownMenu from './DropdownMenu';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { AlertsContext } from '../contexts/AlertsContext';
import { AuthContext } from '../contexts/AuthContext';
import { WishlistsContext } from '../contexts/WishlistContext';

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
  const { setMessage } = useContext(AlertsContext);
  const { currentUser } = useContext(AuthContext);
  const { wishlists } = useContext(WishlistsContext);
  const [procuctIsLoading, setProductIsLoading] = useState({});
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

  const wishlistsOptions = Object.entries(wishlists).map(([id, wishlist]) => {
    return {
      label: wishlist.title,
      id,
    };
  });

  const getActions = (product) => {
    const canDelete = currentUser && (currentUser.uid === product.addedBy || currentUser.isAdmin);

    const handleDelete = () => {
      setProductIsLoading((prodcutsLoading) => ({ ...prodcutsLoading, [product.id]: true }));
      deleteGiftById(product.id).finally(
        setProductIsLoading((prodcutsLoading) => ({ ...prodcutsLoading, [product.id]: false }))
      );
    };

    const handleAddToWishlist = ({ id: wishlistId }) => {
      if (!currentUser || !currentUser.uid) {
        return;
      }
      addGiftToWishlist(wishlistId, product.id)
        .then(() => {
          setMessage('Gift added to wishlist.', 'success');
        })
        .catch(() => {
          setMessage('Failed to add gift to wishlist.', 'error');
        });
    };

    return (
      <>
        {!!canDelete && (
          <IconButton aria-label="Delete" onClick={handleDelete}>
            <Tooltip placement="top" title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        )}

        {wishlistsOptions.length > 0 && (
          <Tooltip title="Add to wishlist">
            <DropDownMenu
              options={wishlistsOptions}
              onClick={handleAddToWishlist}
              getIcon={() => <BookmarkAddIcon />}
            />
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <CardsGridStyled>
      {values.map((data, i) => (
        <ShopProductCard
          key={`card-${data.id || i}`}
          getActions={() => getActions(data)}
          isLoading={procuctIsLoading[data.id]}
          product={data}
        />
      ))}
    </CardsGridStyled>
  );
}

CardsGrid.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
