import { combineReducers } from 'redux';

const ringSelection = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_RING':
      return [action.payload, ...state];
    default:
      return state;
    }
};

const ringDivision = (state = [  {1 : 16, 2: 8, 3: 5} ], action) => {
  switch (action.type) {
    case 'CHANGE_RING_DIVISION':
      let updatedObj = {};
      updatedObj[action.ring] = action.division;
      return [Object.assign(state[0], updatedObj) , ...state];
    default:
      return state;
    }
}

const reducers = combineReducers({
  ringSelection,
  ringDivision
})

export default reducers;