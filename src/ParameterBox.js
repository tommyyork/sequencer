import React, { Component } from 'react';
import './App.css';
import { Knob } from 'react-rotary-knob';

export class ParameterBox extends Component {

  changeReverbWet(val) {
    this.props.changeReverbWet(val);
   }
  
   changeReverbSize(val) {
    this.props.changeReverbSize(val);
   }



  render() {
    return (
      <div className="d-flex justify-content-center">

        <div className="parameterBox flex-row">
        Parameter Box


        <div className="d-flex">
          <div className="p-2 flex-column" style={{padding: '10px'}}>
            <Knob defaultValue={0.05} min={0} max={.8} onChange={this.changeReverbWet.bind(this)} />
            Reverb Wet / Dry<br />
            {Math.floor(this.props.reverbWet * 100) / 100}
          </div>

          <div className="p-2 flex-column" style={{padding: '10px'}}>
            <Knob defaultValue={0.05} min={0} max={.9} onChange={this.changeReverbSize.bind(this)} />
            Reverb Size<br />
            {Math.floor(this.props.reverbSize * 100) / 100}
          </div>

        </div>
      </div>

      </div>
    )
    }
  }