
import highchartsConfig from "./HighchartsConfig";
import React from 'react';
import { Tile } from '../Shared/Tile';
import { AppContext } from "../App/AppProvider";
//import ReactHighcharts from "react-highcharts";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsTheme from "./HighchartsTheme";
import ChartSelect from "./ChartSelect";

//ReactHighcharts.Highcharts.setOptions(HighchartsTheme);
Highcharts.setOptions(HighchartsTheme);



export default function _PriceChart() {
  return (
    <AppContext.Consumer>
      {({historical, changeChartSelect}) =>
        <Tile>
          <ChartSelect
            defaultValue={"days"}
            onChange={e => changeChartSelect(e.target.value)}  
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </ChartSelect>
          { historical ?
            <HighchartsReact
              highcharts={Highcharts} 
              options={highchartsConfig(historical)}/>
            : <div> Loading historical data </div>
          }
        </Tile>
      }
    </AppContext.Consumer>
  )
}