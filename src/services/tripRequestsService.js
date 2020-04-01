/* eslint-disable prettier/prettier */
import http from './httpService';

export default () => {
    const response = http.get('/api/trips/requests?page=1&limit=30');
    return response;
};

export const commentService = (tripId, comment) => {
    const result = http.post(`/api/trips/requests/${tripId}/comments`, { comment });
    return result;
};

export const viewComments = (tripId, page, limit) => {
    const result = http.get(`/api/trips/request/${tripId}/comments?page=${page}&limit=${limit}`);
    return result;
}

export const deleteComment = async (tripId, commentId, subjectType) => {
    const result = await http.delete(`/api/trips/${tripId}/comments/${commentId}`, { data: { subjectType } });
    return result;
}

export const getTripStats = () => {
    const result = http.get('/api/trips/stats');
    return result;
}
