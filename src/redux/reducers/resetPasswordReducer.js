// import { FIND_USER, RESET_PASSWORD } from '../actions/actionTypes';

const initialState = {
  error: '',
  message: '',
  loading: false,
}

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FIND_USER_PENDING':
      return {
        ...state,
        error: '',
        message: '',
        loading: true
      }
    case 'FIND_USER_FULFILLED':
        return {
          ...state,
          message: action.payload.data.message,
          loading: false,
        }
  case 'FIND_USER_REJECTED':
          return {
            ...state,
            error: action.payload.response.data.message,
            loading: false,
          }
    case 'RESET_PASSWORD_PENDING':
      return {
        ...state,
        error: '',
        message: '',
        loading: true
      }
    case 'RESET_PASSWORD_FULFILLED':
      return {
        ...state,
        message: action.payload.data.message,
        loading: false,
      }
    case 'RESET_PASSWORD_REJECTED':
      return {
        ...state,
        error: action.payload.response.data.message,
        loading: false,
      }
    default:
      return state;
  }
}

export default resetPasswordReducer;
