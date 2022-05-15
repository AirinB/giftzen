import React, { useContext, useState } from 'react';
import { Button, capitalize, TextField } from '@mui/material';
import { WishlistsContext } from '../contexts/WishlistContext';
import { createWishlist } from '../firebase/database';
import { Link } from 'react-router-dom';

export default function WishlistsPage() {
  const { wishlists } = useContext(WishlistsContext);
  const [wishlistName, setWishlistName] = useState('');
  const [inputErrors, setInputErros] = useState([]);

  const submitNewWishlist = () => {
    if (!wishlistName) {
      setInputErros(['Wishlist name is required']);
      return;
    }
    setWishlistName('');
    createWishlist({ title: wishlistName });
  };

  const changeInput = (event) => {
    setInputErros([]);
    setWishlistName(event.target.value);
  };

  return (
    <>
      <div>
        {Object.keys(wishlists).length === 0 && <h1>No wishlists yet!</h1>}
        <TextField
          error={inputErrors.length > 0}
          helperText={inputErrors.join(', ')}
          value={wishlistName}
          onChange={changeInput}
        />
        <Button variant="contained" onClick={submitNewWishlist}>
          Add wishlist
        </Button>
      </div>
      <ul>
        {Object.entries(wishlists).map(([id, wishlist]) => {
          console.log({ id, wishlist });
          return (
            <li key={id}>
              <Link to={`/wishlists/${id}`}>{capitalize(wishlist.title)}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
