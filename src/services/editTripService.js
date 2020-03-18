/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import http from './httpService';

export const updateTripService = (tripId, values) => {
    const result = http.patch(`/api/trips/${tripId}/edit`, values);
    return result;
};