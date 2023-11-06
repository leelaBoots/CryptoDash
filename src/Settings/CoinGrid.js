import React from 'react';
import styled from 'styled-components';
import { AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';


// use auto-fill to make the grid responsive to the devices screen width.
export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin: 10px 0 20px 0;
`;

// if we have a coinFilter, then return the filteredCoins(slice these results too to optimize the search speed), otherwise the first 100
function getLowerSectionCoins(coinList, filteredCoins) {
  return (filteredCoins && Object.keys(filteredCoins).slice(0, 84)) || 
    Object.keys(coinList).slice(0, 96);
}

function getCoinsToDisplay(coinList, topSection, favorites, filteredCoins) {
  return topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins);
}

export default function _CoinGrid({topSection}) {
  return (
    <AppContext.Consumer>
      {({coinList, favorites, filteredCoins}) => (
        <CoinGridStyled>
        {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey =>
          <CoinTile key={coinKey} topSection={topSection} coinKey={coinKey} />
        )}
      </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
}