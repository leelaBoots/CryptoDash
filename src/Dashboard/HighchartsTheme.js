export default {
  colors: ['#61D936', '#552CCB'],
  chart: {
    backgroundColor: '#061A44',
    borderColor: '#000000',
    borderWidth: 0,
    className: 'dark-container',
    plotBackgroundColor: '#061A44',
    plotBorderWidth: 0
  },
  title: {
    style: {
      color: '#C0C0C0',
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  subtitle: {
    style: {
      color: '#666666',
      font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  xAxis: {
    gridLineColor: '#333333',
    gridLineWidth: 0,
    labels: {
      style: {
        color: '#A0A0A0'
      }
    },
    lineColor: '#A0A0A0',
    tickColor: '#A0A0A0',
    title: {
      style: {
        color: '#CCC',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    gridLineColor: '#333333',
    gridLineWidth: 0,
    labels: {
      style: {
        color: '#A0A0A0'
      }
    },
    lineColor: '#A0A0A0',
    minorTickInterval: null,
    tickColor: '#A0A0A0',
    tickWidth: 1,
    title: {
      style: {
        color: '#CCC',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
      }
    }
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    style: {
      color: '#F0F0F0'
    }
  },
  toolbar: {
    itemStyle: {
      color: 'silver'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        color: '#CCC'
      },
      marker: {
        lineColor: '#333'
      }
    },
    spline: {
      marker: {
        lineColor: '#333'
      }
    },
    scatter: {
      marker: {
        lineColor: '#333'
      }
    },
    candlestick: {
      lineColor: 'white'
    }
  },
  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
      color: 'gray'
    },
    itemHoverStyle:{
      color: '61D936'
    }
  },
  credits: {
    enabled: false
  },
  labels: {
    style: {
      color: '#CCC'
    }
  },
  scrollbar: {
    backgroundColor: {
      stops: [
        [0.4, '#888'],
        [0.6, '#555']
      ]
    },
    barBorderColor: '#CCC',
    buttonArrowColor: '#CCC',
    buttonBorderColor: '#CCC',
    rifleColor: '#FFF',
    trackBorderColor: '#666'
  },
  legendBackgroundColor: 'rgba(0, 0, 0, 0,5)',
  background2: 'rgb(35, 35, 70)',
  dataLabelsColor: '#444',
  textColor: '#C0C0C0',
  maskColor: 'rgba(255, 255, 255, 0.3)'
};