/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import { FIND_MANAGER_REQUESTS } from '../../redux/actions/actionTypes';
import { getManagerRequests } from '../../redux/actions/requestApprovalAction';

const requestsInputData = {
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
};

describe('Test on approval table actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  test('Should Return Expected Action ', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'List request directed to you',
          data: {
            ...requestsInputData,
          },
        },
      });
    });
    const expectedActions = [
      {
        type: FIND_MANAGER_REQUESTS,
        payload: {
          ...requestsInputData,
        },
      },
    ];
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    return store.dispatch(
      getManagerRequests(),
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      },
    );
  });
});
