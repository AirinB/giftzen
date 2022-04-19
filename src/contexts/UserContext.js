import React, { useContext, useEffect, useState } from "react";
import { getUserLikedGifts } from "../firebase/database";
import { AuthContext } from "./AuthContext";
import { indexBy, prop } from "ramda";

export const UserContext = React.createContext({
  likedGifts: {},
});

const UserContextProvider = UserContext.Provider;

export const UserContextWrapper = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [likedGifts, setLikedGifts] = useState({});
  const { uid: userId } = currentUser || {};

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = getUserLikedGifts(userId, (data) => {
      setLikedGifts(indexBy(prop("giftId"), data));
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
