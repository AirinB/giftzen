import {
  ref,
  onValue,
  set,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { sortBy, prop, sort, descend } from "ramda";
import { database } from "../firebase-config";

export const getCategories = (onData = () => null) => {
  const categoryRef = ref(database, "category");
  onValue(categoryRef, (snapshot) => {
    const categories = snapshot.val();
    onData(categories);
  });
};

const withDefaultDate = (date) => {
  if (!date) {
    return 0;
  }
  return date;
};

export const getGiftsByCategoryId = (categoryId, onData = () => null) => {
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
    },
    {
      once: true,
    }
  );
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
  const giftsRef = ref(database, `gift/${gift.id}`);
  return set(giftsRef, gift);
};
