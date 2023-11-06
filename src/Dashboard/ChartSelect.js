import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

export default styled.select`
 background-color: #211496;
 ${fontSize2};
 color: lightgrey;
 border: 0px solid black;
 margin: 10px;
 height: 25px;
 float: right;
 -webkit-appearance: listbox !important;
 display: block;
`;