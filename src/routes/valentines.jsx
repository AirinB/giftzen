import CardsGrid from "../components/CardsGrid";
import StyledButton from "../components/StyledButton";
import React from "react";

export default function Valentines() {
    return (
        <>
            <h2>Valentines</h2>
            <StyledButton/>
            <CardsGrid resource={'valentines'}/>
        </>
    );
}
