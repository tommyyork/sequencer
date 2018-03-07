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
        <Sequencer top={0} right={0} width={180} started={this.state.started} />
        <Sequencer top={100} right={100} width={180} started={this.state.started} />
      </div>
    </div>
    );
  }
}

export default App;
