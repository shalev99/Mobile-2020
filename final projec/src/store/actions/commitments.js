import Commitment from '../../models/commitment';

export const ADD_COMMITMENT = 'ADD_COMMITMENT';
export const SET_COMMITMENTS = 'SET_COMMITMENTS';

export const fetchCommitments = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://makegood-728b4.firebaseio.com/commitments/${userId}.json`
      );

      if (!response.ok) {
        throw new Error('משהו השתבש...');
      }

      const resData = await response.json();
      const loadedCommitments = [];

      for (const key in resData) {
        loadedCommitments.push(
          new Commitment(key, resData[key].commitmentItems, new Date(resData[key].date))
        );
      }
      dispatch({ type: SET_COMMITMENTS, commitments: loadedCommitments });
    } catch (err) {
      throw err;
    }
  };
};

export const addCommitment = (commitmentItems) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://makegood-728b4.firebaseio.com/commitments/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          commitmentItems,
          points: 30,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('משהו השתבש...');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_COMMITMENT,
      commitmentData: {
        id: resData.name,
        items: commitmentItems,
        points: 30,
        date
      }
    });
  };
};
