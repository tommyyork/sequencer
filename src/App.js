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
      width: 360,
      strokeWidth: 48,
      viewBox: `0 0 360 360`,   // also put width here, for now
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
        colors: {
          1: '#000000',
          2: '#111111',
          3: '#222222',
          4: '#333333',
          5: '#444444',
          6: '#555555',
          7: '#666666',
          8: '#777777',
          9: '#888888',
          10: '#999999',
          11: '#AAAAAA',
          12: '#BBBBBB',
          13: '#CCCCCC',
          14: '#DDDDDD',
          15: '#EEEEEE',
          16: '#FFFFFF'
        }
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
    this.setState({ started: !this.state.started });
    (this.state.started) ? Tone.Transport.start() : Tone.Transport.stop();
  }

  flipNote(note) {
    let stateObj = Object.assign({}, this.state);
    stateObj.sequence.on[note] = !stateObj.sequence.on[note]
    this.setState(stateObj);
  }

  renderButton(x, width, strokeWidth) {
    let radius = (width / 2) - (strokeWidth / 2);
    let cx = width / 2;
    let cy = width / 2;
    let id = `arc${x}`
    let strokeColor = ''

    if (this.state.currentNote === x) {
      strokeColor = '#f77a52';
    } else if (this.state.sequence.on[x] && this.state.currentNote !== x) {
      strokeColor = this.state.sequence.colors[x];
    } else if (!this.state.sequence.on[x] && this.state.currentNote !== x) {
      strokeColor = '#4277f4';
    }

    return (
      <a key={x} onClick={(e) => this.flipNote(x)} >
        <path id={id} 
          fill="none" 
          stroke={strokeColor}
          strokeWidth={strokeWidth} 
          d={this.describeArc(cx, cy, radius, 360*((x - 1)/16), 360, x)}/>
      </a>
    )
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, startAngle, endAngle, note) {
    var start = this.polarToCartesian(x, y, radius, endAngle - .0001);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }

  generateCircle(width, strokeWidth) {
    let radius = (width / 2) - (strokeWidth / 2);
    let cx = width / 2;
    let cy = width / 2;

    return (
        <circle 
          cx={cx} 
          cy={cy} 
          r={radius} 
          fill="none" 
          stroke="#e6e6e6"
    strokeWidth={strokeWidth} /> )

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
          <button className="btn btn-primary" 
            onClick={(e) => this.startOrStopSynth(e)}>
              {this.state.started ? `Start` : `Stop`}
          </button>
            <h1 className="display-4">{this.state.currentNote}</h1>
        </div>
      </header>
      <div>

        <svg width={this.state.width} height={this.state.width} viewBox={this.state.viewBox} >
          {/* {this.generateCircle(this.state.width, this.state.strokeWidth)} */}
          {notes.map((n) => 
            this.renderButton(n, this.state.width, this.state.strokeWidth))}
            
          </svg >
      </div>
      </div>
    );
  }
}

export default App;
