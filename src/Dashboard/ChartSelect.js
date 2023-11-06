import styled from 'styled-components';
import { greenBackgroundColor, fontSize2 } from '../Shared/Styles';

export default styled.select`
 ${greenBackgroundColor};
 ${fontSize2};
 color: black;
 border: 0px solid black;
 margin: 10px;
 height: 25px;
 float: right;
 -webkit-appearance: listbox !important;
 display: block;
`;