/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { FIND_TRIP_REQUESTS, FIND_TRIP_LOCATIONS } from './actionTypes';
import tripRequestsService from '../../services/tripRequestsService';
import tripLocationsService from '../../services/tripLocationsService';

export const getAllTripRequests = () => {
  return {
    type: FIND_TRIP_REQUESTS,
    payload: tripRequestsService(),
  };
};

export const getAllTripLocations = () => {
  return {
    type: FIND_TRIP_LOCATIONS,
    payload: tripLocationsService(),
  };
};

