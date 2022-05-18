import React, { useContext, useEffect, useState } from 'react';
import { getLikedGifts } from '../firebase/database';
import ShopProductCard from '../components/ProductCard';
import { CardsGridStyled } from '../components/CardsGrid';
import { AuthContext } from '../contexts/AuthContext';

export default function LikedGiftsPage() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState([]);
  const { uid: userId } = currentUser || {};
  useEffect(() => {
    console.log('in effect,', { userId });
    if (!userId) return;
    setIsLoading(true);

    return getLikedGifts(userId, (data) => {
      setValues(data);
      setIsLoading(false);
    });
  }, [userId]);

  return (
    <>
      <h2>My liked gifts</h2>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <CardsGridStyled>
          {values.map((data) => (
            <ShopProductCard key={`product-card-${data.id}`} product={data} />
          ))}
        </CardsGridStyled>
      )}
    </>
  );
}
