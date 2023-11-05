import React from 'react';
import styled from 'styled-components';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';

const SpotlightName = styled.h2`
  text-align: center;
`

export default function _CoinSpotlight() {
  // we need the current favorite off of the appprovider
  return (
    <AppContext.Consumer>
      {({currentFavorite, coinList}) =>
      <Tile>
        <SpotlightName> {coinList[currentFavorite].CoinName} </SpotlightName>
        <CoinImage spotlight coin={coinList[currentFavorite]} />
      </Tile>
      }
    </AppContext.Consumer>
  )
}