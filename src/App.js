import React, { Component } from 'react';
// import logo from './logo.svg';
import Tone from 'tone';
import './App.css';
import Sequencer from './Sequencer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: true
    }
  }

  startOrStopSynth(e) {
    this.setState({ started: !this.state.started });
    (this.state.started) ? Tone.Transport.start() : Tone.Transport.stop();
  }

  notes1 = {
    1: 'C3',
    2: 'F3',
    3: 'C3',
    4: 'A3',
    5: 'C3',
    6: 'F3',
    7: 'C3',
    8: 'C4',
    9: 'C3',
    10: 'A3',
    11: 'C3',
    12: 'C4',
    13: 'C3',
    14: 'C4',
    15: 'C4',
    16: 'F4'
  }

  notes2 = {
    16: 'C3',
    15: 'F3',
    14: 'C3',
    13: 'A3',
    12: 'C3',
    11: 'F3',
    10: 'C3',
    9: 'C4',
    8: 'C3',
    7: 'A3',
    6: 'C3',
    5: 'C4',
    4: 'C3',
    3: 'C4',
    2: 'C4',
    1: 'F4'
  }

  colors1 = {
    1: '#0000FF',
    2: '#1111FF',
    3: '#2222FF',
    4: '#3333FF',
    5: '#4444FF',
    6: '#5555FF',
    7: '#6666FF',
    8: '#7777FF',
    9: '#8888FF',
    10: '#9999FF',
    11: '#AAAAFF',
    12: '#BBBBFF',
    13: '#CCCCFF',
    14: '#DDDDFF',
    15: '#EEEEFF',
    16: '#FFFFFF'
  }

  colors2 = {
    16: '#0000FF',
    15: '#1111FF',
    14: '#2222FF',
    13: '#3333FF',
    12: '#4444FF',
    11: '#5555FF',
    10: '#6666FF',
    9: '#7777FF',
    8: '#8888FF',
    7: '#9999FF',
    6: '#AAAAFF',
    5: '#BBBBFF',
    4: '#CCCCFF',
    3: '#DDDDFF',
    2: '#EEEEFF',
    1: '#FFFFFF'
  }

  render() {
    return (
      <div className="App">
      <header>
        <div>
            <h1 className="display-4">Circular Sequencer Prototype</h1>
          <button className="btn btn-primary" 
            onClick={(e) => this.startOrStopSynth(e)}>
              {this.state.started ? `Start` : `Stop`}
          </button>
            
        </div>
      </header>
      <div>
      <svg width={512} height={512} viewBox={`-72 -24 512 512`} >
        <Sequencer 
          top={0} 
          right={0} 
          width={360} 
          cx={180} 
          cy={180} 
          started={this.state.started} 
          sequence={this.notes1}
          colors={this.colors1}/>
        <Sequencer 
          top={45} 
          right={45} 
          width={180} 
          cx={180} 
          cy={180} 
          started={this.state.started} 
          sequence={this.notes2} 
          colors={this.colors2}/>
      </svg>
      </div>
    </div>
    );
  }
}

export default App;
