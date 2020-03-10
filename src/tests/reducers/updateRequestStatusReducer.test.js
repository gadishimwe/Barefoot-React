/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import updateReqStatusReducer from '../../redux/reducers/updateRequestStatusReducer';
import { MANAGER_UPDATE_REQUEST } from '../../redux/actions/actionTypes';
import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

describe('Manager Update Request Status Reducer', () => {
  it('Should return unchanged initial state: Unknown actiontype', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      status: '',
      loading: false,
      message: ''
    }
    expect(updateReqStatusReducer (undefined, action)).toEqual(initialState);
  });

  it('Should successfully change the initial state: FULFILLED', () => {
    const action = {
      type: fulfilled(MANAGER_UPDATE_REQUEST),
      payload: {
        data: {
          message: 'Request has successfully approved',
          data: {
            status: 'approved'
          }
        }
      }
    };
    const expectedState = {
      status: 'approved',
      message: 'Request has successfully approved',
      loading: false
    };
    expect(updateReqStatusReducer (undefined, action)).toEqual(expectedState);
  });

  it('Should Not change the initial state: PENDING', () => {
    const action = {
      type: pending(MANAGER_UPDATE_REQUEST)
    };
    const initialState = {
      status: '',
      loading: false,
      message: ''
    }
    const expectedState = {
      status: '',
      loading: true,
      message: ''
    }
    expect(updateReqStatusReducer (initialState, action)).toEqual(expectedState);
  });

  it('Should Not change the initial state: REJECTED', () => {
    const action = {
      type: rejected(MANAGER_UPDATE_REQUEST)
    };
    const initialState = {
      status: '',
      loading: false,
      message: ''
    }
    expect(updateReqStatusReducer(undefined, action)).toEqual(initialState);
  });
});
