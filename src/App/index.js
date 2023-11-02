import React, { Component } from 'react';
import './App.css';
import WelcomeMessage from '../Settings/WelcomeMessage';
import styled, {css} from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider'; // wrapping in brackets means we are pulling name from object export
import Settings from '../Settings';


class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar></AppBar>
          <Settings />
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
