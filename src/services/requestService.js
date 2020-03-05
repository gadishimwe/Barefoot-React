/* eslint-disable prettier/prettier */
import http from './httpService';

export default () => {
    const response = http.get('/api/manager/requests');
    return response;
};
