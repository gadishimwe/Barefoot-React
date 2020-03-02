/* eslint-disable prettier/prettier */
import { CREATE_ONE_WAY_TRIP, GET_LOCATIONS } from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

export const initialState = {
  loading: false,
  messages: '',
  locations: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fulfilled(GET_LOCATIONS):
      return {
        ...state,
        locations: [...action.payload.data.data],
        messages: ''
      };
    case pending(GET_LOCATIONS):
      return {
        ...state
      };
    case rejected(GET_LOCATIONS):
      return {
        ...state
      };

    case rejected(CREATE_ONE_WAY_TRIP):
      return {
        ...state,
        messages: action.payload.response.data.message,
        loading: false
      };
    case fulfilled(CREATE_ONE_WAY_TRIP):
      return {
        ...state,
        messages: action.payload.data.message,
        loading: false
      };
    case pending(CREATE_ONE_WAY_TRIP):
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
