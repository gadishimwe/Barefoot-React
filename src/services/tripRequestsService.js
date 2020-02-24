/* eslint-disable prettier/prettier */
import http from './httpService';

export default () => {
    const response = http.get('/api/trips/requests?page=1&limit=30');
    return response;
};
