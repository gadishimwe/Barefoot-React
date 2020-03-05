/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import { FIND_MANAGER_REQUESTS } from '../actions/actionTypes';
import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
    data: ''
}

const managerRequestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case rejected(FIND_MANAGER_REQUESTS):
            return state;
        case fulfilled(FIND_MANAGER_REQUESTS):
            return {
                ...state,
                data: action.payload.data.data,
            }
        case pending(FIND_MANAGER_REQUESTS):
            return state;
        default:
            return state;
    }
}

export default managerRequestsReducer;