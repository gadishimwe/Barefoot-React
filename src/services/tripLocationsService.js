/* eslint-disable prettier/prettier */
import http from './httpService';

export default () => {
    const response = http.get('/api/trips/locations');
    return response;
};