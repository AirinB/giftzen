import OutlinedCard from './BasicCard'
import * as React from "react";
import styled from 'styled-components'

const CardsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  align-items: stretch;`

const grid = (
    <CardsGridStyled>
        <OutlinedCard/>
        <OutlinedCard/>
        <OutlinedCard/>
    </CardsGridStyled>

);

export default function CardsGrid() {
    return (
        grid
            );
}
