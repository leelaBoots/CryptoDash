import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';  // library used to conduct our fuzzy search on coin names

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`
const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => { // debounce reduces number of events coming in with a ms delay
  // Get all the coin symbols
  let coinSymbols = Object.keys(coinList);
  // Get all the coin names, map symbol to names
  let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
  // combine list of symbols and names together to search on
  let allStringsToSearch = coinSymbols.concat(coinNames);
  // use fuzzy library to search, take the data structure returned from fuzzy and mao to the stringa we want (name and/or symbol)
  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string)

  // use the results to iterate over our original list of coins to build a new list of coins that match name or symbol
  let filteredCoins = _.pickBy(coinList, (result, symKey) => {
    let coinName = result.coinName;
    // do our fuzzy results return the symbol, or do they contain the name.
    return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
  })  
  console.log(fuzzyResults);
  setFilteredCoins(filteredCoins)
}, 500);


function filterCoins(event, setFilteredCoins, coinList) {
  let inputValue = event.target.value;
  // if the search input is cleared out, set filter to null, so that all the coins will show up again
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function _Search() {
  return (
    <AppContext.Consumer>
      {({setFilteredCoins, coinList}) =>
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput onKeyUp={(event) => filterCoins(event, setFilteredCoins, coinList)} />
        </SearchGrid>
      }
    </AppContext.Consumer>
  )   
}