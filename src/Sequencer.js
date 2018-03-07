import React, { Component } from 'react';
// import logo from './logo.svg';
import Tone from 'tone';
import './App.css';

class Sequencer extends Component {
  constructor(props) {
    super(props);
    
    this.reverb = new Tone.Freeverb().toMaster();
    this.reverb.wet.value = 0.5;
    this.synth = new Tone.PolySynth(4, Tone.Synth).connect(this.reverb);

    this.width =  this.props.width;
    this.strokeWidth = 48;
    this.viewBox = `0 0 ${this.props.right + this.width + this.strokeWidth + 2} ${this.props.top + this.width + this.strokeWidth + 2}`,   // also put width here, for now
    

    this.state  = {
      started: true,       // needs fix: this should start false, change to true. below is a hacky solution.
      currentNote: 1,
      sequence: {
        notes: this.props.sequence,
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


  triggerSynth = (time, note) => {
    this.setState({currentNote: note}, () => console.log(this.state.currentNote));
    if (this.state.sequence.on[note]) this.synth.triggerAttackRelease(this.state.sequence.notes[note], '3n', time);
  }


  componentDidMount() {
    Tone.Transport.schedule((time) => this.triggerSynth(time, 1), '0:0:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 2), '0:0:2')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 3), '0:1:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 4), '0:1:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 5), '0:2:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 6), '0:2:2')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 7), '0:3:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 8), '0:3:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 9), '0:4:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 10), '0:4:2')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 11), '0:5:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 12), '0:5:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 13), '0:6:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 14), '0:6:2')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 15), '0:7:0')
    Tone.Transport.schedule((time) => this.triggerSynth(time, 16), '0:7:2');

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

  renderButton(x) {
    let width = this.width;
    let strokeWidth = this.strokeWidth;

    let radius = (width / 2) - (strokeWidth / 2);
    let cx = this.props.right + width / 2;
    let cy = this.props.top + width / 2;
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
    var start = this.polarToCartesian(this.props.right + x, this.props.top + y, radius, endAngle - .0001);
    var end = this.polarToCartesian(this.props.right + x, this.props.top + y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }

  generateCircle(width, strokeWidth) {
    let radius = (width / 2) - (strokeWidth / 2);
    let cx = this.props.right + width / 2;
    let cy = this.props.top + width / 2;

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
    console.log(this.viewBox);

    let notes = [];
    notes.length = 16;
    notes.fill(0);
    notes = notes.map((x, i) => i + 1);
    // console.log(notes);

    return (
      <div>

        <svg width={this.width} height={this.props.width} viewBox={this.viewBox} >
        <h1 className="display-4">{this.state.currentNote}</h1>
          {/* {this.generateCircle(this.state.width, this.state.strokeWidth)} */}
          {notes.map((n) => 
            this.renderButton(n))}
            
          </svg >
      </div>
    );
  }
}

export default Sequencer;
