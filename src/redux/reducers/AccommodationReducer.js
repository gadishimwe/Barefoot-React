/* eslint-disable prettier/prettier */
import {  GET_LOCATIONS, ADD_ACCOMMODATION } from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

export const initialState = {
  loading: false,
  locations: [],
  response: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fulfilled(GET_LOCATIONS):
      return {
        ...state,
        locations: [...action.payload.data.data]
      };
    case pending(GET_LOCATIONS):
      return {
        ...state
      };
    case rejected(GET_LOCATIONS):
      return {
        ...state
      };
    case pending(ADD_ACCOMMODATION):
			return {
				...state,
				loading: true,
			};
		case fulfilled(ADD_ACCOMMODATION):
			return {
				...state,
				response: action.payload.data,
				loading: false,
			};
		case rejected(ADD_ACCOMMODATION):
			return {
				...state,
				response: action.payload.response.data,
				loading: false,
			};
    default:
      return state;
  }
};

export default reducer;
