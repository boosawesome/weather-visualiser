import React from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import axios from 'axios';

const url : string = "http://localhost:3001/getPlotData";

type Props = {  };
type State = { x: Date[], yAir: number[], ySea: number[]}

class App extends React.Component <Props, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      x: [],
      yAir: [],
      ySea: []
    };
  }


  componentDidMount() {
    
    axios.get(url).then(response => {

      let x: Array<Date> = [];
      let yAir: Array<number> = [];
      let ySea: Array<number> =[];

      response.data.data.forEach((row: Array<string>) => {   
        x.push(new Date(row[0]));
        yAir.push(+ row[1]);
        ySea.push(+ row[2]);
      });

      this.setState({ 
        x: x,
        yAir: yAir,
        ySea: ySea
      })
    })
  }
  
  render() {
    const {x, yAir, ySea } = this.state;
    return (
      <Plot
        data={[
          {
            x: x,
            y: yAir,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'green' },
            name: 'Max Sea Surface Wave Directional Spectra'
          },
          {
            x: x,
            y: ySea,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
            name: 'Air temp 2m above grounds'
          }
        ]}
        layout={{ width: 1200, height: 800, title: 'MetService Ocean Data' }}
      />
    );
  }
}

export default App;
