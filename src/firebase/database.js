import {
  ref,
  onValue,
  set,
  query,
  orderByChild,
  orderByKey,
  equalTo,
  get,
  remove,
  push,
  update,
} from "firebase/database";
import { prop, sort, descend, uniq, without } from "ramda";
import { database, auth } from "../firebase-config";

export const getCategories = (onData = () => null) => {
  return new Promise((resolve, reject) => {
    const categoryRef = ref(database, "category");
    return onValue(
      categoryRef,
      (snapshot) => {
        const categories = snapshot.val();
        onData(categories);
        resolve(categories);
      },
      reject
    );
  });
};

const withDefaultDate = (date) => {
  if (!date) {
    return 0;
  }
  return date;
};

export const getGiftsByCategoryId = (categoryId, onData = () => null) => {
  return new Promise((resolve, reject) => {
    const giftsRef = ref(database, "gift");
    const filteredRef = query(
      giftsRef,
      orderByChild("categoryId"),
      equalTo(categoryId)
    );

    onValue(
      filteredRef,
      (snapshot) => {
        const response = snapshot.val();
        const gifts = (response ? Object.values(response) : []).map((gift) => ({
          ...gift,
          addedOn: gift.addedOn || 0,
        }));
        const sorted = sort(descend(prop("addedOn")), gifts);
        onData(sorted);
        resolve(sorted);
      },
      reject,
      {
        once: true,
      }
    );
  });
};

export const getGiftByAsin = (asin, onData = () => null) => {
  const giftsRef = ref(database, "gift");
  const filteredRef = query(giftsRef, orderByChild("asin"), equalTo(asin));

  return new Promise((resolve, reject) => {
    onValue(
      filteredRef,
      (snapshot) => {
        const response = snapshot.val();
        const gifts = response ? Object.values(response) : [];
        onData(gifts);
        resolve(gifts);
      },
      {
        once: true,
      }
    );
  });
};

export const addGift = (gift) => {
  console.log(gift);
  const giftsRef = ref(database, `gift/${gift.id}`);
  return set(giftsRef, gift);
};

export const deleteGiftById = (id) => {
  const giftsRef = ref(database, `gift/${id}`);
  return remove(giftsRef);
};

export const upsertUser = async (firebaseUser) => {
  const usersRef = ref(database, `user/${firebaseUser.uid}`);
  const user = await get(usersRef);
  if (user.exists()) {
    return user.val();
  } else {
    const newUser = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoUrl: firebaseUser.photoURL,
      uid: firebaseUser.uid,
      isAdmin: false,
      createdOn: Date.now(),
    };
    await set(usersRef, newUser);
    return newUser;
  }
};

export const getUserById = (uid, onData = () => null) => {
  const usersRef = ref(database, `user/${uid}`);
  const unsubscribe = onValue(
    usersRef,
    (snapshot) => {
      const user = snapshot.val();
      onData(user);
      unsubscribe();
    },
    {
      once: true,
    }
  );
};

export const likeGift = (giftId, userId) => {
  const likesRef = ref(database, `likes`);
  return push(likesRef, {
    giftId,
    userId,
    addedOn: Date.now(),
  });
};

export const unlikeGift = (giftId, userId) => {
  const likesRef = ref(database, "likes");
  const filteredRef = query(likesRef, orderByChild("giftId"), equalTo(giftId));
  return new Promise((resolve, reject) => {
    const unsubscribe = onValue(
      filteredRef,
      async (snapshot) => {
        const response = snapshot.val() || {};
        const likes = Object.entries(response).map(([key, value]) => ({
          ...value,
          key,
        }));
        const like = likes.find((like) => like.userId === userId);
        if (like) {
          await remove(ref(database, `likes/${like.key}`));
        }
        unsubscribe();
        resolve();
      },
      reject,
      {
        once: true,
      }
    );
  });
};

export const getUserLikedGifts = (userId, onData = () => null) => {
  const likesRef = ref(database, `likes`);
  const filteredRef = query(likesRef, orderByChild("userId"), equalTo(userId));

  return onValue(filteredRef, (snapshot) => {
    const response = snapshot.val();
    const likes = response ? Object.values(response) : [];
    onData(likes);
  });
};

export const getGiftsByIds = (giftIds, onData = () => null) => {
  const giftsRef = ref(database, "gift");
  const unsubscribeGifts = onValue(
    giftsRef,
    (snapshot) => {
      const response = snapshot.val();
      const gifts = response ? Object.values(response) : [];
      unsubscribeGifts();
      const filteredGifts = gifts.filter((gift) => giftIds.includes(gift.id));
      onData(filteredGifts);
    },
    {
      once: true,
    }
  );
};

export const getLikedGifts = (userId, onData) => {
  const likesRef = ref(database, "likes");
  const filteredRef = query(likesRef, orderByChild("userId"), equalTo(userId));
  console.log({ userId }, filteredRef);
  return onValue(filteredRef, (snapshot) => {
    const response = snapshot.val();
    const likes = response ? Object.values(response) : [];

    return getGiftsByIds(
      likes.map((like) => like.giftId),
      onData
    );
  });
};

export const createWishlist = (wishlist) => {
  const userId = auth.currentUser.uid;

  if (!userId) {
    throw new Error("User not logged in!");
  }

  const wishlistsRef = ref(database, "wishlist");
  return push(wishlistsRef, {
    userId,
    ...wishlist,
    gifts: [],
    createdOn: Date.now(),
  });
};

export const getWishlistById = (wishlistId, onData = () => null) => {
  const wishlistsRef = ref(database, "wishlist");
  const filteredRef = query(wishlistsRef, orderByKey(), equalTo(wishlistId));

  return onValue(filteredRef, (snapshot) => {
    const response = snapshot.val();
    const wishlist = response ? response || {} : {};
    onData(wishlist);
  });
};

export const getWishlists = (onData) => {
  const userId = auth.currentUser && auth.currentUser.uid;
  if (!userId) {
    return onData({});
  }

  const wishlistsRef = ref(database, "wishlist");
  const filteredRef = query(
    wishlistsRef,
    orderByChild("userId"),
    equalTo(userId)
  );
  return onValue(filteredRef, (snapshot) => {
    const response = snapshot.val();
    const wishlists = response || {};
    onData(wishlists);
  });
};

export const deleteWishlist = (wishlistId) => {
  const wishlistsRef = ref(database, `wishlist/${wishlistId}`);
  return remove(wishlistsRef);
};

export const addGiftToWishlist = async (wishlistId, giftId) => {
  const wishlistRef = ref(database, `wishlist/${wishlistId}`);
  const wishlist = (await get(wishlistRef)).val();
  return update(wishlistRef, {
    gifts: uniq([...(wishlist.gifts || []), giftId]),
  });
};

export const removeGiftFromWishlist = async (wishlistId, giftId) => {
  const wishlistRef = ref(database, `wishlist/${wishlistId}`);
  const wishlist = (await get(wishlistRef)).val();
  return update(wishlistRef, {
    gifts: without([giftId], wishlist.gifts || []),
  });
};

export const getGiftsByWishlistId = async (wishlistId, onData) => {
  const wishlistRef = ref(database, `wishlist/${wishlistId}`);
  onValue(wishlistRef, (snapshot) => {
    const response = snapshot.val();
    const giftIds = response ? response.gifts || [] : [];

    return getGiftsByIds(giftIds, onData);
  });
};
