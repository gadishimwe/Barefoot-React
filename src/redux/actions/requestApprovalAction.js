/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { FIND_MANAGER_REQUESTS } from './actionTypes';
import requestService from '../../services/requestService';

export const getManagerRequests = () => {
    return {
        type: FIND_MANAGER_REQUESTS,
        payload: requestService(),
    };
};

