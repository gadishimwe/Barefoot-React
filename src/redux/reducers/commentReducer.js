/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import { COMMENT_ON_TRIP } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
    data: '',
    loading: false,
    message: ''
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case pending(COMMENT_ON_TRIP):
            return {
                ...state,
                loading: true
            }
        case fulfilled(COMMENT_ON_TRIP):
            return {
                ...state,
                message: action.payload.data.message,
                loading: false 
            }
        case rejected(COMMENT_ON_TRIP):
            return {
                ...state,
                loading: false
            }     
        default:
            return state;
    }
}

export default commentsReducer;
