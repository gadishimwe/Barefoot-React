/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { UPDATE_TRIP } from './actionTypes';
import { updateTripService } from '../../services/editTripService';

export const formatDate = dt => {
  const month = `0${dt.getMonth() + 1}`.slice(-2);
  const date = `0${dt.getDate()}`.slice(-2);
  const formattedDate = `${dt.getFullYear()}-${month}-${date}`;
  return formattedDate;
};

  export const editTripRequest = (tripId, values) =>{
    let editTripRequestValue;
    if (values.returnDate) {
      editTripRequestValue = {
        originId: values.origin.id,
        destinationId: values.destination.id,
        returnDate: formatDate(values.returnDate),
        departureDate: formatDate(values.departureDate),
        travelReasons: values.travelReasons,
      }
    } else {
      editTripRequestValue = {
        originId: values.origin.id,
        destinationId: values.destination.id,
        departureDate: formatDate(values.departureDate),
        travelReasons: values.travelReasons,
      }
    }
    return {
      type: UPDATE_TRIP,
      payload: updateTripService(tripId, editTripRequestValue)
    };
  }