export const selectRing = (ring) => dispatch => {
  dispatch ({ type: 'SELECT_RING', payload: ring})
}

export const changeRingDivision = (ring, division) => dispatch => {
  dispatch ({ type: 'CHANGE_RING_DIVISION', payload: {ring: ring, division: ring}});
}

