/* eslint-disable prettier/prettier */
import httpService from '../../services/httpService';
import { CREATE_TRIP, CREATE_ONE_WAY_TRIP, CREATE_RETURN_TRIP, TRIP_STATS  } from './actionTypes';
import { getTripStats } from '../../services/tripRequestsService';

export const formatDate = dt => {
  const month = `0${dt.getMonth() + 1}`.slice(-2);
  const date = `0${dt.getDate()}`.slice(-2);
  const formattedDate = `${dt.getFullYear()}-${month}-${date}`;
  return formattedDate;
};

export const createMultiCityTrip = values => {
  const tripRequest = values.trips.map(trip => {
    const request = {
      originId: trip.origin.id,
      destinationId: trip.destination.id,
      departureDate: formatDate(trip.departureDate),
      travelReasons: trip.travelReasons
    };
    return request;
  });
  return {
    type: CREATE_TRIP,
    payload: httpService.post('/api/trips/multi-city', tripRequest)
  };
}

export const createOneWayTrip = values => {
  const oneWayTripRequest = {
    originId: values.origin.id,
    destinationId: values.destination.id,
    departureDate: formatDate(values.departureDate),
    travelReasons: values.travelReasons
  }
  return {
    type: CREATE_ONE_WAY_TRIP,
    payload: httpService.post('/api/trips/one-way', oneWayTripRequest)
  };
};

export const createReturnTrip = values => {
  const returnTripRequest = {
    originId: values.origin.id,
    destinationId: values.destination.id,
    returnDate: formatDate(values.returnDate),
    departureDate: formatDate(values.departureDate),
    travelReasons: values.travelReasons,
  }
  return {
    type: CREATE_RETURN_TRIP,
    payload: httpService.post('/api/trips/return', returnTripRequest)
  };
};

export const tripStatsAction = () => {
  return {
    type: TRIP_STATS,
    payload: getTripStats()
  }
}
