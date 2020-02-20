/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import { UPDATE_PROFILE } from '../actions/actionTypes';

import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

const initialState = {
    userData: {
        gender: 'M',
        residence: 'Rwanda',
        preferredLanguage: 'english',
        preferredCurrency: 'Dollar',
        birthDate: '1990-01-01',
        profilePicture: 'dnjsfhbnjdsfhbfdjnskdjshj'
    },
    error: {},
    loading: false,
    message: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case rejected(UPDATE_PROFILE):
            return {
                ...state,
                userData: {
                    ...state.userData
                },
                error: action.payload.response.message
            };
        case fulfilled(UPDATE_PROFILE):
            if (action.payload !== undefined) {
                return {
                    ...state,
                    userData: {
                        ...action.payload.data.data
                    },
                    message: action.payload.data.message,
                    loading: false
                }
            }
        case pending(UPDATE_PROFILE):
            return {
                ...state,
                userData: {
                    ...state.userData
                },
                error: {},
                loading: true,
            };
        default:
            return state;
    }
}

export default profileReducer;