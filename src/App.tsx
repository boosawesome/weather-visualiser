import React from 'react';
import './App.css';
import Plot from 'react-plotly.js';

let x: Array<number> = [1,2,3]
let y: Array<number> = [4,5,6]


class App extends React.Component {
  
  render() {
    return (
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: x, y: y },
        ]}
        layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
      />
    );
  }
}

export default App;
