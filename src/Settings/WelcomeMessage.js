import React from 'react';
import styled from 'styled-components';
import { AppContext } from "../App/AppProvider";
import { fontSize1, color3 } from "../Shared/Styles";

const  WelcomeMessage = styled.div`
  color: ${color3};
  ${fontSize1};
  margin-bottom: 25px;
`;

export default function _WelcomeMessage({firstVisit}) {
    return (
        <AppContext.Consumer>
            {({firstVisit}) =>
                firstVisit ? <WelcomeMessage>
                    Welcome to Crypto Coin Tracker. Please select your favorite coins to begin.{' '}
                    </WelcomeMessage> : null
            }
        </AppContext.Consumer>
        );
};