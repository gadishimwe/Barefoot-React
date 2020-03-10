/* eslint-disable prettier/prettier */
import http from './httpService';

export default () => {
    const response = http.get('/api/manager/requests');
    return response;
};

export const updateRequestStatusService = (requestId, status) => {
    const result = http.patch(`/api/manager/requests/${requestId}`, { status });
    return result;
};
