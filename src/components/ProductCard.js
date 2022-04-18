import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import Label from './Label';
import numeral from 'numeral';
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    product: PropTypes.object
};

function fCurrency(number) {
    return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

const stars = (rating)=>{
    rating = Math.abs(rating)
    return [...Array(Math.floor(rating))].map((_, i) => {
        return <span role="img" aria-label="star">⭐</span>
    });
}

export default function ShopProductCard(product) {
    const { name, cover, price, status, priceSale, rating, link, prime } = product;

    function handleChange(e){
        console.log("Liked!!");
    }

    return (
        <Card>
            <Link href={link} underline="none">
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {prime && (
                    <Label
                        variant="filled"
                        color={(status === 'sale' && 'error') || 'info'}
                        sx={{
                            zIndex: 9,
                            top: 16,
                            right: 16,
                            position: 'absolute',
                            textTransform: 'uppercase'
                        }}
                    >
                        Prime
                    </Label>
                )}
                <ProductImgStyle alt={name} src={cover} />
            </Box>
            </Link>
            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Link>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                                textDecoration: 'line-through'
                            }}
                        >
                            {priceSale!== -1&&priceSale && fCurrency(priceSale)}
                        </Typography>
                        &nbsp;
                        { fCurrency(price)}
                        &nbsp;
                        {stars(rating)}
                    </Typography>
                        <IconButton aria-label="add to favorites" onClick={handleChange}>
                            <FavoriteIcon

                            />
                        </IconButton>
                </Stack>

            </Stack>
        </Card>
    );
}
