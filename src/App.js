import React, { Component } from 'react';
import logo from './logo.svg';
import Tone from 'tone';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: true,       // needs fix: this should start false, change to true. below is a hacky solution.
      sequence: {
        notes: {
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
        },
        on: {       // again, these all need to be flipped
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
          7: true,
          8: true,
          9: true,
          10: true,
          11: true,
          12: true,
          13: true,
          14: true,
          15: true,
          16: true
        },
      }
    }
  }

  componentDidMount() {
    var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
    let triggerSynth = (time, note) => {
      console.log(note);
      console.log('planned note?', this.state.sequence.on[note]);
      console.log('planned pitch?', this.state.sequence.notes[note]);
      if (this.state.sequence.on[note]) synth.triggerAttackRelease(this.state.sequence.notes[note], '3n', time);
    }

    Tone.Transport.schedule((time) => triggerSynth(time, 1), '0:0:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 2), '0:0:2')
    Tone.Transport.schedule((time) => triggerSynth(time, 3), '0:1:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 4), '0:1:2');
    Tone.Transport.schedule((time) => triggerSynth(time, 5), '0:2:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 6), '0:2:2')
    Tone.Transport.schedule((time) => triggerSynth(time, 7), '0:3:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 8), '0:3:2');
    Tone.Transport.schedule((time) => triggerSynth(time, 9), '0:4:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 10), '0:4:2')
    Tone.Transport.schedule((time) => triggerSynth(time, 11), '0:5:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 12), '0:5:2');
    Tone.Transport.schedule((time) => triggerSynth(time, 13), '0:6:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 14), '0:6:2')
    Tone.Transport.schedule((time) => triggerSynth(time, 15), '0:7:0')
    Tone.Transport.schedule((time) => triggerSynth(time, 16), '0:7:2');

    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = true

  }

  startOrStopSynth(e) {
    // e.preventDefault();
    // e.stopPropagation();
    this.setState({ started: !this.state.started });
    (this.state.started) ? Tone.Transport.start() : Tone.Transport.stop();
  }

  flipNote(note) {
    let stateObj = Object.assign({}, this.state);
    stateObj.sequence.on[note] = !stateObj.sequence.on[note]
    this.setState(stateObj);
  }

  renderButton(x) {
    
    
    if (!this.state.sequence.on[x]) return (
    <div key={x}>
      <button className="btn btn-success" onClick={(e) => this.flipNote(x)}>
        {`unmute ${x}`}
      </button>
    </div>
    )

    if (this.state.sequence.on[x]) return (
      <div key={x}>
        <button className="btn btn-warning" onClick={(e) => this.flipNote(x)}>
          {`mute ${x}`}
      </button>
      </div>
    )
  }

  render() {
    let notes = [];
    notes.length = 16;
    notes.fill(0);
    notes = notes.map((x, i) => i + 1);
    // console.log(notes);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button className="btn btn-primary" onClick={(e) => this.startOrStopSynth(e)}>{this.state.started ? `Start` : `Stop`}</button>
        </p>
        <p>
          {notes.map((x) => this.renderButton(x))}
        </p>
      </div>
    );
  }
}

export default App;
