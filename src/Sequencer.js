import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

// redux dispatch functions

import { selectRing, changeRingDivision } from './actions';

// time signature division function

import { noteDivisionFxn } from './toneFunctions/noteDivisions';

class Sequencer extends Component {
  constructor(props) {
    super(props);
    
    this.reverb = this.props.reverb;
    this.synth = this.props.synth;

    this.width =  this.props.width;
    this.strokeWidth = this.props.strokeWidth;
    this.viewBox = `0 0 ${this.width + this.strokeWidth + 2} ${this.props.top * 2 + this.width + this.strokeWidth + 2}`;   // also put width here, for now
    

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
        colors: this.props.colors
      }
    }
  }


  triggerSynth = (time, note) => {
    console.log(this.synth);
    this.setState({currentNote: note}, () => console.log(this.state.currentNote));
    if (this.synth && this.state.sequence.on[note])
      this.synth.triggerAttackRelease(this.state.sequence.notes[note],
         `${this.props.noteLength ? this.props.noteLength : 1}n`, time);
  }


  componentDidMount() {

    console.log('this.props.ringDivision:', this.props.ringDivision);
    let divisions = noteDivisionFxn(this.props.ringDivision[0][this.props.ring]);
    console.log('divisions:', divisions);

    // divisions.forEach((x, i) => 
    Tone.Transport.schedule((time) => this.triggerSynth(time, 1), '0:0:0');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 2), '0:0:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 3), '0:1:0');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 4), '0:1:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 5), '0:2:0');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 6), '0:2:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 7), '0:3:0');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 8), '0:3:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 9), '0:4:0');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 10), '0:4:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 11), '0:5:0');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 12), '0:5:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 13), '0:6:0');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 14), '0:6:2');
    Tone.Transport.schedule((time) => this.triggerSynth(time, 15), '0:7:0');
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
    let cx = this.props.cx;
    let cy = this.props.cy;
    let id = `arc${x}`
    let strokeColor = ''

    if (this.state.currentNote === x) {
      strokeColor = '#f77a52';
    } else if (this.state.sequence.on[x] && this.state.currentNote !== x) {
      strokeColor = this.state.sequence.colors[x];
    } else if (!this.state.sequence.on[x] && this.state.currentNote !== x) {
      strokeColor = '#000000';
    }

    return (
      [<a key={x} onClick={(e) => {
        if (this.props.ringSelection[0] === this.props.ring) this.flipNote(x)
        this.props.selectRing(this.props.ring)
      }} >,
        <path id={id} 
          fill="none" 
          stroke={strokeColor}
          strokeWidth={strokeWidth} 
          d={this.describeArc(cx, cy, radius, 360*((x - 1)/this.props.ringDivision[0][this.props.ring]), 360, x)}/>,
      </a>]
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
    var start = this.polarToCartesian(this.props.cx, this.props.cy, radius, endAngle - .0001);
    var end = this.polarToCartesian(this.props.cx, this.props.cy, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }

  render() { 

    let notes = [];
    notes.length = this.props.ringDivision[0][this.props.ring];
    notes.fill(0);
    notes = notes.map((x, i) => i + 1);

    if (this.props.ringSelection[0] === this.props.ring) {
      return [<circle
          key='outerSelectionRing' 
          cx={this.props.cx} 
          cy={this.props.cy} 
          r={this.props.width / 2 + 1}  
          fill="transparent"
          stroke="red"
          strokeWidth={2} />,
        notes.map((n) => this.renderButton(n)),
        <circle
        key='innerSelectionRing' 
        cx={this.props.cx} 
        cy={this.props.cy} 
        r={this.props.width / 2 - this.strokeWidth}  
        fill="transparent"
        stroke="red"
        strokeWidth={2} />]
      } else {
        return ( notes.map((n) => this.renderButton(n)))
      }
  }
}

const mapStateToProps = ({ ringSelection, ringDivision }) => {
  return {
    ringSelection,
    ringDivision
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectRing: (ring) => dispatch(selectRing(ring)),
    changeRingDivision: (ring, division) => dispatch(changeRingDivision(ring, division))
  }
}

Sequencer = connect(mapStateToProps, mapDispatchToProps)(Sequencer);

export default Sequencer;
