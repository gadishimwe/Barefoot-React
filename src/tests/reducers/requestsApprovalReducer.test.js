/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import managerRequestsReducer from '../../redux/reducers/requestsApprovalReducer';
import { FIND_MANAGER_REQUESTS } from '../../redux/actions/actionTypes';
import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

describe('Manager Requests Reducer', () => {
  it('Should return unchanged initial state: Unknown actiontype', () => {
    const action = { type: 'dummy_action' };
    const initialState = { data: '' };
    expect(managerRequestsReducer(undefined, action)).toEqual(initialState);
  });

  it('Should successfully change the initial state: FULFILLED', () => {
    const action = {
      type: fulfilled(FIND_MANAGER_REQUESTS),
      payload: {
        data: {
          status: 200,
          message: 'List request directed to you',
          data: [
            {
              id: 1,
              requesterId: 2,
              status: 'approved',
              lineManagerId: 1,
              tripType: 'Return Trip',
              requesterFname: 'celine',
              requesterLname: 'uwimbabazi',
              requesterPicture: null,
              createdAt: '2020-03-03T18:48:11.570Z',
              updatedAt: '2020-03-03T19:41:47.660Z'
            }
          ] 
        }
      }
    };
    const expectedState = {
      data: [
        {
          id: 1,
          requesterId: 2,
          status: 'approved',
          lineManagerId: 1,
          tripType: 'Return Trip',
          requesterFname: 'celine',
          requesterLname: 'uwimbabazi',
          requesterPicture: null,
          createdAt: '2020-03-03T18:48:11.570Z',
          updatedAt: '2020-03-03T19:41:47.660Z'
        }
      ] 
    };
    expect(managerRequestsReducer(undefined, action)).toEqual(expectedState);
  });

  it('Should Not change the initial state: PENDING', () => {
    const action = {
      type: pending(FIND_MANAGER_REQUESTS)
    };
    const initialState = { data: '' };
    expect(managerRequestsReducer(undefined, action)).toEqual(initialState);
  });

  it('Should Not change the initial state: REJECTED', () => {
    const action = {
      type: rejected(FIND_MANAGER_REQUESTS)
    };
    const initialState = { data: '' };
    expect(managerRequestsReducer(undefined, action)).toEqual(initialState);
  });

});
