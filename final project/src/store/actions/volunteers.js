import Volunteer from '../../models/volunteer';

export const DELETE_Volunteer = 'DELETE_Volunteer';
export const CREATE_Volunteer = 'CREATE_Volunteer';
export const UPDATE_Volunteer = 'UPDATE_Volunteer';
export const SET_VolunteerS = 'SET_VolunteerS';

export const fetchVolunteers = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch('https://makegood-728b4.firebaseio.com/volunteers.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedVolunteers = [];

      for (const key in resData) {
        loadedVolunteers.push(
          new Volunteer(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].location,
            resData[key].time
          )
        );
      }

      dispatch({
        type: SET_VolunteerS,
        volunteers: loadedVolunteers,
        userVolunteers: loadedVolunteers.filter((vol) => vol.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteVolunteer = (volunteerId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://makegood-728b4.firebaseio.com/volunteers/${volunteerId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_Volunteer, vid: volunteerId });
  };
};

export const createVolunteer = (title, description, imageUrl, location, time) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://makegood-728b4.firebaseio.com/volunteers.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          location,
          time,
          ownerId: userId
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_Volunteer,
      volunteerData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        location,
        time,
        ownerId: userId
      }
    });
  };
};

export const updateVolunteer = (id, title, description, imageUrl, location, time) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://makegood-728b4.firebaseio.com/volunteers/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          location,
          time
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_Volunteer,
      vid: id,
      volunteerData: {
        title,
        description,
        imageUrl,
        location,
        time
      }
    });
  };
};
