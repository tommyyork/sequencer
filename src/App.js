import React, { Component } from 'react';
// import logo from './logo.svg';
import Tone from 'tone';
import './App.css';
import Sequencer from './Sequencer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: false
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
        <Sequencer top={0} right={0} width={180} started={this.state.started} sequence={this.notes1}/>
        <Sequencer top={100} right={100} width={180} started={this.state.started} sequence={this.notes2} />
      </div>
    </div>
    );
  }
}

export default App;
