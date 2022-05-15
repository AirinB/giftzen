import PropTypes from "prop-types";
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Tooltip,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Label from "./Label";
import numeral from "numeral";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { likeGift, unlikeGift } from "../firebase/database";
import { UserContext } from "../contexts/UserContext";
import { WishlistsContext } from "../contexts/WishlistContext";
import { AlertsContext } from "../contexts/AlertsContext";

// ----------------------------------------------------------------------

const StyledCard = styled(Card)`
  position: relative;

  .actions-container {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    flex-direction: column;
    height: 100%;
  }

  :hover {
    .actions-container {
      background: rgba(255, 255, 255, 0.8);
      display: flex;
    }
  }
`;

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    addedOn: PropTypes.number,
    addedBy: PropTypes.string,
    asin: PropTypes.string,
    title: PropTypes.string.isRequired,
    full_link: PropTypes.string.isRequired,
    description: PropTypes.string,
    amazon_choice: PropTypes.bool,
    prime: PropTypes.bool,
    out_of_stock: PropTypes.bool,
    prices: PropTypes.shape({
      current_price: PropTypes.string.isRequired,
      previous_price: PropTypes.string,
      currency: PropTypes.string,
    }),
    reviews: PropTypes.shape({
      stars: PropTypes.number.isRequired,
      total_reviews: PropTypes.number,
    }),
    image: PropTypes.string.isRequired,
  }),
};

function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

const stars = (rating) => {
  rating = Math.abs(rating);
  return [...Array(Math.round(rating))].map((_, i) => {
    return (
      <span role="img" aria-label="star">
        ⭐
      </span>
    );
  });
};

export default function ShopProductCard({ product, getActions }) {
  const { setMessage } = useContext(AlertsContext);
  const { currentUser } = useContext(AuthContext);
  const { likedGifts } = useContext(UserContext);
  const { wishlists } = useContext(WishlistsContext);
  const [isLoading, setIsLoading] = useState(false);
  const { title, image, prices, reviews, full_link, prime } = product;
  const sale =
    prices &&
    prices.current_price &&
    prices.current_price < prices.previous_price;

  function handleChange(e) {
    if (!currentUser || !currentUser.uid) {
      setMessage(
        "You must be logged in to add a gift to a wishlist",
        "warning"
      );
      return;
    }

    if (likedGifts[product.id]) {
      unlikeGift(product.id, currentUser.uid);
    } else {
      likeGift(product.id, currentUser.uid);
    }
  }

  const hasActions = !!getActions && typeof getActions === "function";

  return (
    <StyledCard>
      <Link target="_blank" href={full_link} underline="none">
        <Box sx={{ pt: "100%", position: "relative" }}>
          {prime && (
            <Label
              variant="filled"
              color="info"
              sx={{
                zIndex: 9,
                bottom: 16,
                right: 16,
                position: "absolute",
                textTransform: "uppercase",
              }}
            >
              Prime
            </Label>
          )}
          <ProductImgStyle alt={title} src={image} />
        </Box>
      </Link>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          target="_blank"
          href={full_link}
          color="inherit"
          underline="hover"
        >
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            {sale && (
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through",
                }}
              >
                {fCurrency(prices.previous_price)}
              </Typography>
            )}
            &nbsp;
            {prices ? fCurrency(prices.current_price) : "N/A"}
            &nbsp;
            {stars(reviews.stars)}
          </Typography>
          <IconButton
            style={{ zIndex: 1 }}
            aria-label="add to favorites"
            onClick={handleChange}
          >
            <FavoriteIcon
              style={{ color: likedGifts[product.id] ? "red" : undefined }}
            />
          </IconButton>
          {!!product.addedBy && (
            <Tooltip title="Added by an user">
              <AccountCircleOutlinedIcon />
            </Tooltip>
          )}
        </Stack>
      </Stack>
      {!!currentUser && hasActions && (
        <div className="actions-container">{getActions()}</div>
      )}
      <Backdrop
        sx={{
          position: "absolute",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </StyledCard>
  );
}
