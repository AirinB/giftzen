import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CardMedia} from "@mui/material";


export default function OutlinedCard(props) {
    console.log(props.id, props.title)

    return (
        <Box sx={{ maxWidth: 200 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.image}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            {props.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            {props.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">{props.rating}</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}
