import { UPDATE_PROFILE } from '../actions/actionTypes';

const initialState = {
    gender: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                gender:'F'
            }
        default:
            return state;
    }
}

export default profileReducer;