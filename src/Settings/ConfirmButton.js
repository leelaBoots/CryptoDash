import React from "react";
import styled from 'styled-components';
import { AppContext } from "../App/AppProvider";
import { fontSize1, greenBoxShadow, color3 } from "../Shared/Styles";


const  ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1};
  padding: 5px;
  cursor: pointer;
  border: .5px solid ${color3};
  &:hover {
    ${greenBoxShadow}
  }
`;

export const LeftDiv = styled.div`
  display: grid;
  justify-content: left;
`;

export default function _ConfirmButton() {
  return (
    <AppContext.Consumer> 
      {({confirmFavorites}) => 
        <LeftDiv>
          <ConfirmButtonStyled onClick={confirmFavorites}>
            Confirm Favorites
          </ConfirmButtonStyled>
        </LeftDiv>
      }
    </AppContext.Consumer>
  )
}