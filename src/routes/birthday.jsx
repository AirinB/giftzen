import CardsGrid from "../components/CardsGrid";
import StyledButton from "../components/StyledButton";
import React from "react";

export default function Birthday() {
    return (
        <>
            <h2>Birthday</h2>
            <StyledButton/>
            <CardsGrid resource={'birthday'}/>
        </>
    );
}
