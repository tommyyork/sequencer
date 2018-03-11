import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Knob } from 'react-rotary-knob';

// redux dispatch functions

import { selectRing, changeRingDivision } from './actions';


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
        <div className="d-flex">
          <div className="p-2 flex-column">
            <div className="p-2 flex-row">
            <Knob 
              style={{display: "inline-block"}}
              defaultValue={Math.floor(this.props.reverbWet * 100) / 100}
              min={0} max={.8} // values about 80% can introduce terrible feedback
              onChange={this.changeReverbWet.bind(this)} />
            </div>
            <div className="p-2 flex-row">

              {Math.floor(this.props.reverbWet * 100) / 100}<br />
              Reverb<br />
              Wet / Dry
            </div>
          </div>

          <div className="p-2 flex-column">
            <div className="p-2 flex-row">
              <Knob 
                style={{display: "inline-block"}}
                defaultValue={Math.floor(this.props.reverbSize * 100) / 100} 
                min={0} 
                max={.9} 
                onChange={this.changeReverbSize.bind(this)} />
                        </div>
            <div className="p-2 flex-row">

              {Math.floor(this.props.reverbSize * 100) / 100}<br />
              Reverb Size
            </div>
          </div>

          <div className="p-2 flex-column">
            <div className="p-2 flex-row">
              <Knob 
                style={{display: "inline-block"}}
                defaultValue={this.props.ringDivision[0]["1"]} 
                min={1} 
                max={17} 
                onChange={(e) => this.props.changeRingDivision(1, Math.floor(e))} />
                        </div>
            <div className="p-2 flex-row">
            {this.props.ringDivision[0]["1"]}<br />
              Outer<br />Ring<br />Division
              
            </div>
          </div>

          <div className="p-2 flex-column">
            <div className="p-2 flex-row">
              <Knob 
                style={{display: "inline-block"}}
                defaultValue={this.props.ringDivision[0]["2"]} 
                min={1} 
                max={17} 
                onChange={(e) => this.props.changeRingDivision(2, Math.floor(e))} />
                        </div>
            <div className="p-2 flex-row">
            {this.props.ringDivision[0]["2"]}<br />
              Middle<br />Ring<br />Division

            </div>
          </div>

          <div className="p-2 flex-column">
            <div className="p-2 flex-row">
              <Knob 
                style={{display: "inline-block"}}
                defaultValue={this.props.ringDivision[0]["3"]} 
                min={1} 
                max={17} 
                onChange={(e) => this.props.changeRingDivision(3, Math.floor(e))} />
                        </div>
            <div className="p-2 flex-row">
            {this.props.ringDivision[0]["3"]}<br />
              Inner<br />Ring<br />Division

            </div>
          </div>

        </div>
        (Note that the loop re-divide on the measure)
      </div>

      </div>
    )
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
  
 ParameterBox = connect(mapStateToProps, mapDispatchToProps)(ParameterBox);