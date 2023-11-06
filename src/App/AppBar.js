import React from 'react';
import styled, {css} from 'styled-components';
import { AppContext } from './AppProvider';

const Logo = styled.div`
  font-size: 1.75em;
`;

const Bar = styled.div`
  display: grid;
  grid-template-columns: 250px auto 100px 100px;
  margin-bottom: 40px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03,
      -1px -1px 5px #03ff03,  
      1px -1px 5px #03ff03,
      -1px 1px 5px #03ff03,
      1px 1px 5px #03ff03;
  `}
  ${props => props.hidden && css`
    display: none;
  `}
`;

function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({name}) {
  // pull in page from provider, call back function
  // setPage is a click handler
  return (
    <AppContext.Consumer>
      {({firstVisit, page, setPage}) => (
      <ControlButtonElem
        active={page === name}
        onClick={()=> setPage(name)}
        hidden={firstVisit && name === 'dashboard'}
      >
        {toProperCase(name)}
      </ControlButtonElem>
      )}
    </AppContext.Consumer>
  )
}

export default function _AppBar() {
  return (
    <Bar>
      <Logo> Crypto Coin Tracker </Logo>
      <div></div> 
      <ControlButton active name="dashboard"/> 
      <ControlButton name="search coins"/> 
    </Bar>
  )
}