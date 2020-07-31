import {
  DELETE_Volunteer,
  CREATE_Volunteer,
  UPDATE_Volunteer,
  SET_VolunteerS
} from '../actions/volunteers';
import Volunteer from '../../models/volunteer';

const initialState = {
  availableVolunteers: [],
  userVolunteers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VolunteerS:
      return {
        availableVolunteers: action.volunteers,
        userVolunteers: action.userVolunteers
      };
    case CREATE_Volunteer: {
      const newVolunteer = new Volunteer(
        action.volunteerData.id,
        action.volunteerData.ownerId,
        action.volunteerData.title,
        action.volunteerData.imageUrl,
        action.volunteerData.description,
        action.volunteerData.location,
        action.volunteerData.time
      );
      return {
        ...state,
        availableVolunteers: state.availableVolunteers.concat(newVolunteer),
        userVolunteers: state.userVolunteers.concat(newVolunteer)
      };
    }
    case UPDATE_Volunteer: {
      const volunteerIndex = state.userVolunteers.findIndex((vol) => vol.id === action.vid);
      const updatedVolunteer = new Volunteer(
        action.vid,
        state.userVolunteers[volunteerIndex].ownerId,
        action.volunteerData.title,
        action.volunteerData.imageUrl,
        action.volunteerData.description,
        action.volunteerData.location,
        action.volunteerData.time
      );
      const updatedUserVolunteers = [...state.userVolunteers];
      updatedUserVolunteers[volunteerIndex] = updatedVolunteer;
      const availableVolunteerIndex = state.availableVolunteers.findIndex(
        (vol) => vol.id === action.vid
      );
      const updatedAvailableVolunteers = [...state.availableVolunteers];
      updatedAvailableVolunteers[availableVolunteerIndex] = updatedVolunteer;
      return {
        ...state,
        availableVolunteers: updatedAvailableVolunteers,
        userVolunteers: updatedUserVolunteers
      };
    }
    case DELETE_Volunteer: {
      return {
        ...state,
        userVolunteers: state.userVolunteers.filter((volunteer) => volunteer.id !== action.vid),
        availableVolunteers: state.availableVolunteers.filter(
          (volunteer) => volunteer.id !== action.vid
        )
      };
    }
  }
  return state;
};
