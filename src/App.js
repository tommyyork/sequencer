import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

// components, styling.

// import './App.css';
import Sequencer from './Sequencer';
import { ParameterBox } from './ParameterBox';

// objects - currently notes, colors, should soon be functions that
// return those.

import { notes1, notes2, colors1, colors2 } from './toneFunctions';

// redux dispatch functions

import { selectRing } from './actions';

// finally, constants that define our defaults

import { CONSTANTS } from './Constants'

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: true,
      noteLength: CONSTANTS.APP.NOTE_LENGTH,
      reverbWet: CONSTANTS.APP.REVERB_WET,
      reverbSize: CONSTANTS.APP.REVERB_SIZE
    }

    this.reverb = new Tone.Freeverb(this.state.reverbSize).toMaster();
    this.reverb.wet.value = this.state.reverbWet;
    this.synth = new Tone.PolySynth(4, Tone.Synth).connect(this.reverb);
  }

  startOrStopSynth(e) {
    this.setState({ started: !this.state.started });
    (this.state.started) ? Tone.Transport.start() : Tone.Transport.stop();
  }

  
  changeReverbWet(val) {
    this.reverb.wet.value = val;
    this.setState({reverbWet: val});
  }

  changeReverbSize(val) {
    this.reverb.roomSize.value = val;
    this.setState({reverbSize: val});
  }

  componentWillMount() {
    this.props.selectRing(1);
  }

  render() {
    return (
      <div className="App">
      <header>
        <div>
            <h1 className="display-6">Circular Polyrythm Sequencer</h1>
          <button className="btn btn-primary" 
            onClick={(e) => this.startOrStopSynth(e)}>
              {this.state.started ? `Start` : `Stop`}
          </button>
            
        </div>
      </header>
      <p></p>
      <div className="d-flex justify-content-center">
        <pre>

      <svg width={CONSTANTS.SVG.WIDTH} height={CONSTANTS.SVG.HEIGHT} viewBox={CONSTANTS.SVG.VIEWBOX} >
        <Sequencer 
          ring={1} 
          top={CONSTANTS["1"].TOP} 
          right={CONSTANTS["1"].RIGHT} 
          width={CONSTANTS["1"].WIDTH} 
          cx={CONSTANTS["1"].CX} 
          cy={CONSTANTS["1"].CY} 
          strokeWidth={CONSTANTS["1"].STROKE_WIDTH}
          started={this.state.started} 
          sequence={notes1}
          colors={colors1}
          reverbWet={this.state.reverbWet}
          noteLength={this.state.noteLength}
          reverb={this.reverb}
          synth={this.synth}/>

        <Sequencer 
          ring={2}
          top={CONSTANTS["2"].TOP} 
          right={CONSTANTS["2"].RIGHT} 
          width={CONSTANTS["2"].WIDTH} 
          cx={CONSTANTS["2"].CX} 
          cy={CONSTANTS["2"].CY} 
          strokeWidth={CONSTANTS["2"].STROKE_WIDTH}
          started={this.state.started} 
          sequence={notes2} 
          colors={colors2}
          reverbWet={this.state.reverbWet}
          noteLength={this.state.noteLength}
          reverb={this.reverb}
          synth={this.synth}/>
        
        <Sequencer 
          ring={3}
          top={CONSTANTS["3"].TOP} 
          right={CONSTANTS["3"].RIGHT} 
          width={CONSTANTS["3"].WIDTH} 
          cx={CONSTANTS["3"].CX} 
          cy={CONSTANTS["3"].CY} 
          strokeWidth={CONSTANTS["3"].STROKE_WIDTH}
          started={this.state.started} 
          sequence={notes2} 
          colors={colors1}
          reverbWet={this.state.reverbWet}
          noteLength={this.state.noteLength}
          reverb={this.reverb}
          synth={this.synth}/>
      </svg>
      </pre>

      </div>
      <div className="notes">
        <p>The selected ring is highlighted in red. 
        You can select rings by clicking on any notes in them. 
        Once you've selected a ring, you can 
        turn notes on (blue) and off (black) by clicking on them.</p>
        <p>Loops re-divide (sound different depending on the divisions selected below) at the top of the measure.</p>
      </div>
      <ParameterBox 
        changeReverbWet={this.changeReverbWet.bind(this)} 
        changeReverbSize={this.changeReverbSize.bind(this)}
        reverbWet={this.state.reverbWet}
        reverbSize={this.state.reverbSize}/>
        </div>
    );
  }
}

const mapStateToProps = ({ ringSelection }) => {
  return {
    ringSelection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectRing: (ring) => dispatch(selectRing(ring))
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
