import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserLikedGifts } from '../firebase/database';
import { AuthContext } from './AuthContext';
import { indexBy, prop } from 'ramda';

export const UserContext = React.createContext({
  likedGifts: {},
});

const UserContextProvider = UserContext.Provider;

export const UserContextWrapper = ({ children }) => {
  const [likedGifts, setLikedGifts] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { uid: userId } = currentUser || {};

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = getUserLikedGifts(userId, (data) => {
      setLikedGifts(indexBy(prop('giftId'), data));
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return (
    <UserContextProvider
      value={{
        likedGifts,
      }}
    >
      {children}
    </UserContextProvider>
  );
};

UserContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
