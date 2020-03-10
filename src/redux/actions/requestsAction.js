/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import {
  FIND_TRIP_REQUESTS,
  FIND_TRIP_LOCATIONS,
  COMMENT_ON_TRIP,
  VIEW_COMMENTS,
  MANAGER_UPDATE_REQUEST
} from './actionTypes';
import
  tripRequestsService,
  {
    commentService,
    viewComments
  }
  from '../../services/tripRequestsService';
import tripLocationsService from '../../services/tripLocationsService';
import { updateRequestStatusService } from '../../services/requestService';

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

export const commentOnTrip = (tripId, comment) => {
  return {
    type: COMMENT_ON_TRIP,
    payload: commentService(tripId, comment)
  }
};

export const updateRequestStatus = (requestId, status) => {
  return {
    type: MANAGER_UPDATE_REQUEST,
    payload: updateRequestStatusService(requestId, status)
  }
}

export const viewCommentsAction = (tripId, page, limit) => {
  return {
    type: VIEW_COMMENTS,
    payload: viewComments(tripId, page, limit)
  }
}

