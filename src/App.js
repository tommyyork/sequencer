import React, { Component } from 'react';
// import logo from './logo.svg';
import Tone from 'tone';
import './App.css';
import Sequencer from './Sequencer';
import { ParameterBox } from './ParameterBox';

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

  colors1 = {
    1: '#0000FF',
    2: '#1111FF',
    3: '#2222FF',
    4: '#3333FF',
    5: '#4444FF',
    6: '#5555FF',
    7: '#6666FF',
    8: '#7777FF',
    9: '#8888FF',
    10: '#9999FF',
    11: '#AAAAFF',
    12: '#BBBBFF',
    13: '#CCCCFF',
    14: '#DDDDFF',
    15: '#EEEEFF',
    16: '#FFFFFF'
  }

  colors2 = {
    16: '#0000FF',
    15: '#1111FF',
    14: '#2222FF',
    13: '#3333FF',
    12: '#4444FF',
    11: '#5555FF',
    10: '#6666FF',
    9: '#7777FF',
    8: '#8888FF',
    7: '#9999FF',
    6: '#AAAAFF',
    5: '#BBBBFF',
    4: '#CCCCFF',
    3: '#DDDDFF',
    2: '#EEEEFF',
    1: '#FFFFFF'
  }

  changeReverbWet(val) {
    this.reverb.wet.value = val;
    this.setState({reverbWet: val});
  }

  changeReverbSize(val) {
    this.reverb.roomSize.value = val;
    this.setState({reverbSize: val});
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
          top={0} 
          right={0} 
          width={512} 
          cx={256} 
          cy={256} 
          started={this.state.started} 
          sequence={this.notes1}
          colors={this.colors1}
          reverbWet={this.state.reverbWet}
          noteLength={this.state.noteLength}
          reverb={this.reverb}
          synth={this.synth}/>
        {/* <Sequencer 
          top={256} 
          right={256} 
          width={256} 
          cx={256} 
          cy={256} 
          started={this.state.started} 
          sequence={this.notes2} 
          colors={this.colors2}
          reverbWet={this.state.reverbWet}
          noteLength={this.state.noteLength}/> */}
      </svg>
      </pre>

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

export default App;
