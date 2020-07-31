import { ADD_COMMITMENT, SET_COMMITMENTS } from '../actions/commitments';
import Commitment from '../../models/commitment';

const initialState = {
  commitments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMITMENTS:
      return {
        commitments: action.commitments
      };
    case ADD_COMMITMENT:
      const newCommitment = new Commitment(
        action.commitmentData.id,
        action.commitmentData.items,
        action.commitmentData.points,
        action.commitmentData.date
      );
      return {
        ...state,
        commitments: state.commitments.concat(newCommitment)
      };
  }

  return state;
};
