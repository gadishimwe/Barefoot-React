/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import { UPDATE_TRIP } from '../actions/actionTypes';
import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
  newTrip: '',
  loading: false,
  message: ''
}

const updateTripReducer = (state = initialState, action) => {
  switch (action.type) {
    case pending(UPDATE_TRIP):
      return {
        ...state,
        loading: true
      }
    case fulfilled(UPDATE_TRIP):
      return {
        ...state,
        newTrip: action.payload.data.data,
        message: action.payload.data.message,
        loading: false
      }
    case rejected(UPDATE_TRIP):
      return {
        ...state,
        message: action.payload.response.data.message,
        loading: false
      }
    default:
      return state;
  }
}

export default updateTripReducer;
