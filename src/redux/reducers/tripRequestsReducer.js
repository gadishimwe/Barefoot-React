/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import { FIND_TRIP_REQUESTS } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
    data: ''
}

const tripRequestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case rejected(FIND_TRIP_REQUESTS):
            return state;
        case fulfilled(FIND_TRIP_REQUESTS):
                return {
                    ...state,
                    data: action.payload.data.data.rows,
                }
        case pending(FIND_TRIP_REQUESTS):
            return state;     
        default:
            return state;
    }
}

export default tripRequestsReducer;
