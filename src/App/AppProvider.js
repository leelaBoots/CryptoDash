import React from 'react';
import _ from 'lodash'; // we use this library for some easy array manipulation

const cc = require('cryptocompare');

// this is the optional apikey for CryptoCompare api, stored in my .env file, not part of git project
const CC_API_KEY = process.env.CRYPTOCOMPARE_API_KEY

cc.setApiKey(CC_API_KEY);

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;


// this is the main component of the application
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard', // what page are we on
      favorites: ['BTC', 'ETH', 'FLAP', 'DOGE'], // save keys of our favorite coins
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
  }

  // async function to make the API call to CryptoCompare
  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});
    //console.log(coinList);
  }

  // addCoin is a function that takes a key to the coin we want to add to our favorites
  addCoin = key  => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({favorites});
    }
  }

  removeCoin = key  => {
    let favorites = [...this.state.favorites];
    // use lodash _.pull to remove key-vaue from array, and return new array with that value removed
    this.setState({favorites: _.pull(favorites, key)});
  }

  // use lodash includes to search array for key
  isInFavorites = key => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites
    }));
  }

  savedSettings(){
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      // this means its the first visit, we want to go to the settings page
      return {page: 'settings', firstVisit: true }
    }
    // otherwise, we want to pull the favorites off of the existing data
    let {favorites} = cryptoDashData;
    return {favorites}; // this will override our default favorites
  }

  setPage = page => this.setState({page})

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}