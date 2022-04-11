import CardsGrid from "../components/CardsGrid";
import StyledButton from "../components/StyledButton";
import React from "react";

export default function Woman() {
    return (
        <>
            <h2>Woman</h2>
            <StyledButton/>
            <CardsGrid resource={'woman'}/>
        </>
    );
}
