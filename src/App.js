import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

// components, styling.

import './App.css';
import Sequencer from './Sequencer';
import { ParameterBox } from './ParameterBox';

// objects - currently notes, colors, should soon be functions that
// return those.

import { notes1, notes2, colors1, colors2 } from './toneFunctions';

// redux dispatch functions

import { selectRing } from './actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      started: true,
      noteLength: 16,
      reverbWet: .05,
      reverbSize: .1
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
            <h1 className="display-4">Circular Sequencer</h1>
          <button className="btn btn-primary" 
            onClick={(e) => this.startOrStopSynth(e)}>
              {this.state.started ? `Start` : `Stop`}
          </button>
            
        </div>
      </header>
      <p></p>
      <div className="d-flex justify-content-center">
        <pre>

      <svg width={512} height={512} viewBox={`0 0 512 512`} >
        <Sequencer 
          ring={1} // identify which ring we're currently working on

          top={0} 
          right={0} 
          width={512} 
          cx={256} 
          cy={256} 
          strokeWidth={36}
          started={this.state.started} 
          sequence={notes1}
          colors={colors1}
          reverbWet={this.state.reverbWet}
          noteLength={this.state.noteLength}
          reverb={this.reverb}
          synth={this.synth}/>

        <Sequencer 
          ring={2}

          top={128} 
          right={128} 
          width={256 + 128} 
          cx={256} 
          cy={256} 
          strokeWidth={36}
          started={this.state.started} 
          sequence={notes2} 
          colors={colors2}
          reverbWet={this.state.reverbWet}
          noteLength={this.state.noteLength}
          reverb={this.reverb}
          synth={this.synth}/>
        
        <Sequencer 
          ring={3}

          top={256} 
          right={256} 
          width={256} 
          cx={256} 
          cy={256} 
          strokeWidth={36}
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
      <div style={{color: 'white'}}>
        Selected ring is highlighted in red. 
        Select rings by clicking on them. 
        Once you've selected a ring, you can 
        turn notes on and off by clicking on them.
        </div>
        <p></p>
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
