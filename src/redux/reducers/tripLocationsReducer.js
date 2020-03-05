/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import { FIND_TRIP_LOCATIONS } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
    data: ''
}

const tripLocationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case rejected(FIND_TRIP_LOCATIONS):
            return state;
        case fulfilled(FIND_TRIP_LOCATIONS):
            return {
                ...state,
                data: action.payload.data.data,
            }
        case pending(FIND_TRIP_LOCATIONS):
            return state;
        default:
            return state;
    }
}

export default tripLocationsReducer;
