import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Iconify from "./Iconify";
import React from "react";


export default function StyledButton() {
    return (
        <Button
            style={{margin: '30px'}}
            variant="contained"
            component={Link}
            to="/gift"
            startIcon={<Iconify icon="eva:plus-fill"/>}
        >
            Add Gift Idea
        </Button>);
}
