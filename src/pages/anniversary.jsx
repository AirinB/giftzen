import CardsGrid from "../components/CardsGrid";
import StyledButton from "../components/StyledButton";
import React from "react";

export default function Anniversary() {
    return (
        <>
            <h2>Anniversary</h2>
            <StyledButton/>
            <CardsGrid resource={'anniversary'}/>
        </>
    );
}
