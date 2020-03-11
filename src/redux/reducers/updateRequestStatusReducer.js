/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import { MANAGER_UPDATE_REQUEST } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
    status: '',
    loading: false,
    message: ''
}

const updateReqStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case pending(MANAGER_UPDATE_REQUEST):
            return {
                ...state,
                loading: true
            }
        case fulfilled(MANAGER_UPDATE_REQUEST):
            return {
                ...state,
                status: action.payload.data.data.status,
                message: action.payload.data.message,
                loading: false
            }
        case rejected(MANAGER_UPDATE_REQUEST):
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default updateReqStatusReducer;
