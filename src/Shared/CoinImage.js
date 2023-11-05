import React from 'react';
import styled, {css} from 'styled-components';

// this is a styled component
const CoinImage = styled.img`
  height: 50px;
  ${props => props.spotlight && css`
    height: 200px;
    margin: auto;
    display: block;
  `}
`;


export default function _CoinImage({coin, spotlight}) {
  return (
    <CoinImage
      spotlight={spotlight}
      alt={coin.CoinSymbol}
      src={`http://cryptocompare.com/${
        coin.ImageUrl
      }`}
    />
  );
}