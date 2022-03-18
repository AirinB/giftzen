import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Link from "@mui/material/Link";

const stars = (rating)=>{
    rating = Math.abs(rating)
    return [...Array(Math.floor(rating))].map((_, i) => {
        return <span role="img" aria-label="star">⭐</span>
    });
}
export default function RecipeReviewCard(props) {

    return (
        <Card sx={{ maxWidth: 500 }}>
            <Link href={props.link} underline="none">
            <CardMedia
                component="img"
                height="300"
                image={props.image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.title}
                </Typography>
            </CardContent>
            </Link>
            {stars(props.stars)}
            <span className="MuiTypography-root MuiTypography-body1 css-oa3q5l"/>&nbsp;${props.price}
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
        </Card>
    );
}
