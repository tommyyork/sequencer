import React, { Component } from 'react';
import logo from './logo.svg';
import Tone from 'tone';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: true       // needs fix: this should start false, change to true. below is a hacky solution.
    }
  }

  componentDidMount() {
    var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();


    function triggerSynth(time) {
      let randomNote = Math.floor(Math.random() * 5);

      let notes = {
        1: 'C3',
        2: 'G3',
        3: 'A3',
        4: 'B3',
        5: 'C3'
      }

      synth.triggerAttackRelease(notes[randomNote], '3n', time);
    }

    Tone.Transport.schedule(triggerSynth, '0:0:0')
    Tone.Transport.schedule(triggerSynth, '0:0:2')
    Tone.Transport.schedule(triggerSynth, '0:1:0')
    Tone.Transport.schedule(triggerSynth, '0:1:2');
    Tone.Transport.schedule(triggerSynth, '0:2:0')
    Tone.Transport.schedule(triggerSynth, '0:2:2')
    Tone.Transport.schedule(triggerSynth, '0:3:0')
    Tone.Transport.schedule(triggerSynth, '0:3:2');


    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true

    console.log(Tone.Transport)
  }

  startOrStopSynth(e) {
    // e.preventDefault();
    // e.stopPropagation();
    this.setState({ started: !this.state.started });
    (this.state.started) ? Tone.Transport.start() : Tone.Transport.stop();

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button className="btn btn-primary" onClick={(e) => this.startOrStopSynth(e)}>{this.state.started ? `Start` : `Stop`}</button>
        </p>
      </div>
    );
  }
}

export default App;
