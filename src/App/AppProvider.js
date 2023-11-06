import React from 'react';
import _ from 'lodash'; // we use this library for some easy array manipulation
import moment from 'moment';

const cc = require('cryptocompare');

// this is the optional apikey for CryptoCompare api, stored in my .env file, not part of git project
const CC_API_KEY = process.env.REACT_APP_API_KEY;
cc.setApiKey(CC_API_KEY);

export const AppContext = React.createContext();

const MAX_FAVORITES = 15;
const TIME_PLOTS = 10;

// this is the main component of the application
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard', // what page are we on
      favorites: ['DOGE', 'BTC', 'ETH', 'TRX', 'SOL', 'LTC', 'ADA', 'DOT'], // save keys of our favorite coins
      timeInterval: 'days',
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  }

  // async function to make the API call to CryptoCompare
  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});
    //console.log(coinList);
  }

  fetchPrices = async() => {
    // if its first visit, dont get the prices of the default coins
    if (this.state.firstVisit) return;

    let prices = await this.pricesCall();
    // we must filter the empty price objects
    prices = prices.filter(price => Object.keys(price).length);
    this.setState({prices});
  }

  fetchHistorical = async() => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment().subtract({[this.state.timeInterval]: TIME_PLOTS - index}).valueOf(),
          ticker.USD
        ])
      }
    ]
    this.setState({historical});
  }


  // this will build an array of promises, that eventually all get resolved asynclly
  pricesCall = async() => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        // since we are in an async function, we must await this function to return
        let priceData =  await cc.priceFull(this.state.favorites[i], 'USD');
        returnData.push(priceData);
      } catch (e) {
        console.warn('Fetch price error: ', e);
      }
    }
    return returnData;
  }

  historical = () => {
    let promises = [];
    // we start 10 months from now, then 9 and so on, to create a series that we can chart
    for (let units = TIME_PLOTS; units > 0; units--) {
      promises.push(
        // CryptoCompare API call
        cc.priceHistorical(
          this.state.currentFavorite,
          ['USD'],
          moment()
          .subtract({[this.state.timeInterval]: units})
          .toDate()
        )
      )
    }
    // this returns after all promises have been resolved
    return Promise.all(promises);
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
    let currentFavorite = this.state.favorites[0];
    this.setState({
      firstVisit: false,
      page: 'dashboard',
      currentFavorite,
      prices: null,
      historical: null
    }, () => {
      // add this function callback to get prices after we save the initial state
      this.fetchPrices();
      this.fetchHistorical();
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite
    }));
  }

  setCurrentFavorite = (sym) => {
    this.setState({
      currentFavorite: sym,
      historical: null
    }, this.fetchHistorical);

    // parse out the local storage, get the current value of local storage using ...(spread) and merge with updated currentfavorite
    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }))
  }

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      // this means its the first visit, we want to go to the settings page
      return {page: 'search coins', firstVisit: true }
    }
    // otherwise, we want to pull the favorites off of the existing data
    let {favorites, currentFavorite} = cryptoDashData;
    return {favorites, currentFavorite}; // this will override our default favorites
  }

  setPage = page => this.setState({page});

  setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

  changeChartSelect = (value) =>  {
    this.setState({timeInterval: value, historical: null}, this.fetchHistorical);
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}