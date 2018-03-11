import { combineReducers } from 'redux';
import { CONSTANTS } from '../Constants';

const ringSelection = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_RING':
      return [action.payload, ...state];
    default:
      return state;
    }
};

const ringDivision = (
  state = [  {1 : CONSTANTS["1"].DIVISION, 2: CONSTANTS["2"].DIVISION, 3: CONSTANTS["3"].DIVISION} ], action) => {
  switch (action.type) {
    case 'CHANGE_RING_DIVISION':
      let updatedObj = Object.assign({}, state[0])
      updatedObj[action.payload.ring] = action.payload.division;
      return [updatedObj];
    default:
      return state;
    }
}

const reducers = combineReducers({
  ringSelection,
  ringDivision
})

export default reducers;