import React, { Component } from 'react';
// import logo from './logo.svg';
import Tone from 'tone';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: true,       // needs fix: this should start false, change to true. below is a hacky solution.
      currentNote: 1,
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
      this.setState({currentNote: note}, () => console.log(this.state.currentNote));
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

  assignXcoordinate(n, radius, xOffset, yOffset) {
    let angle = (2 * (16 - (n))) * Math.PI / 16;
    let x = xOffset + radius * Math.cos(angle * 3 / Math.PI);
    return x
  }

  assignYcoordinate(n, radius, xOffset, yOffset) {
    let angle = (2 * (16 - (n))) * Math.PI / 16;
    let y = yOffset + radius * Math.sin(angle * 3 / Math.PI);
    return y;
  }

  renderButton(x, xPosition, yPosition) {
    let angle = (2 * (16 - (x))) * Math.PI / 16;
    let style = {}

    let segmentBorderRadius = 150;
    let segmentWidth = 10;
    let segmentHeight = 10;

    let spanStyleOff = {
      width: `{$segmentWidth}px`,
      height: `{$segmentHeight}px`,
      position: 'absolute', 
      top: yPosition + segmentHeight / 2, 
      left: xPosition + segmentHeight / 2,
      fontSize: '.75em',
      background: `lightGrey`,
      mozBorderRadius: `${segmentBorderRadius}`,
      webkitBorderRadius: `${segmentBorderRadius}`,
      borderRadius: `${segmentBorderRadius}`,
      transform: { rotate: `${angle}deg`}
    }

    let spanStyleOn = {
      width: `{$segmentWidth}px`,
      height: `{$segmentHeight}px`,
      position: 'absolute', 
      top: yPosition + segmentHeight / 2, 
      left: xPosition + segmentHeight / 2,
      fontSize: '.75em',
      background: `lightBlue`,
      mozBorderRadius: `${segmentBorderRadius}`,
      webkitBorderRadius: `${segmentBorderRadius}`,
      borderRadius: `${segmentBorderRadius}`,
    }

    let spanStyleActive = {
      width: `{$segmentWidth}px`,
      height: `{$segmentHeight}px`,
      position: 'absolute', 
      top: yPosition + segmentHeight / 2, 
      left: xPosition + segmentHeight / 2,
      fontSize: '.75em',
      background: `green`,
      mozBorderRadius: `${segmentBorderRadius}`,
      webkitBorderRadius: `${segmentBorderRadius}`,
      borderRadius: `${segmentBorderRadius}`,
    }

    if (this.state.currentNote === x) {
      style = spanStyleActive;
    } else if (this.state.sequence.on[x] && this.state.currentNote !== x) {
      style = spanStyleOn;
    } else if (!this.state.sequence.on[x] && this.state.currentNote !== x) {
      style = spanStyleOff;
    }


    if (!this.state.sequence.on[x]) return (
    <a key={x} onClick={(e) => this.flipNote(x)} 
      style={style}>
        {`${x}`}
    </a>
    )

    if (this.state.sequence.on[x]) return (
      <a key={x} onClick={(e) => this.flipNote(x)} 
        style={style}>
          {`${x}`}
      </a>
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
      <header>
        <div>
          <button className="btn btn-primary" onClick={(e) => this.startOrStopSynth(e)}>{this.state.started ? `Start` : `Stop`}</button>
        </div>
      </header>
      <div className="circle">
          {notes.map((n) => this.renderButton(n, this.assignYcoordinate(n, 150, 150, 150), this.assignXcoordinate(n, 150, 150, 150)))}
      </div>
      </div>
    );
  }
}

export default App;
