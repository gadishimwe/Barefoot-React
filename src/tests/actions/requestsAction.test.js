/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import { FIND_TRIP_REQUESTS, FIND_TRIP_LOCATIONS } from '../../redux/actions/actionTypes';
import { getAllTripRequests,
     getAllTripLocations,
      updateRequestStatus,
      deleteCommentAction } from '../../redux/actions/requestsAction';
import { updateStatus } from '../../redux/actions/getChatUsersAction';

const tripsInputData = {
    status: 200,
    message: 'List of requested trips',
    data: {
        pageMeta: {
            pages: 1,
            currentPage: 1,
            pageSize: 1,
            count: 1
        },
        rows: [
            {
                userId: 1,
                tripType: 'multi - city',
                requestId: 4,
                originId: 7,
                destinationId: 2,
                departureDate: '2020-07-12',
                returnDate: null,
                travelReasons: 'Examination',
                accommodationId: 4,
                createdAt: '2020-02-19',
                updatedAt: '2020-02-19',
                request: {
                    id: 4,
                    requesterId: 1,
                    status: 'pending',
                    lineManagerId: 3,
                    createdAt: '2020-02-19',
                    updatedAt: '2020-02-19'
                }
            },
        ]
    }
};

describe('Test on trip requests table actions', () => {
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
                    message: 'List of requested trips',
                    data: {
                        ...tripsInputData,
                    },
                },
            });
        });
        const expectedActions = [
            {
                type: FIND_TRIP_REQUESTS,
                payload: {
                    ...tripsInputData,
                },
            },
        ];
        const mockStore = configureStore([thunk]);
        const store = mockStore({});
        return store.dispatch(
            getAllTripRequests(),
            () => {
                expect(store.getActions()).toEqual(expectedActions);
            },
        );
    });
});

const locationsInputData = {
    status: 200,
    message: 'List of all available locations',
    data: {
        status: 200,
        message: 'List of all available locations',
        data:
            [
                {
                    id: 1,
                    country: 'Rwanda',
                    city: 'Kigali'
                },
                {
                    id: 2,
                    country: 'Kenya',
                    city: 'Nairobi'
                }
            ]
    }
};


describe('Test on trip locations actions', () => {
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
                    message: 'List of all available locations',
                    data: {
                        ...locationsInputData,
                    },
                },
            });
        });
        const expectedActions = [
            {
                type: FIND_TRIP_LOCATIONS,
                payload: {
                    ...locationsInputData,
                },
            },
        ];
        const mockStore = configureStore([thunk]);
        const store = mockStore({});
        return store.dispatch(
            getAllTripLocations(),
            () => {
                expect(store.getActions()).toEqual(expectedActions);
            },
        );
    });
});
describe('Test request actions', () => {
    it('should return changed status', () => {
        expect(updateRequestStatus(1, 'status')).toEqual({
            type: 'MANAGER_UPDATE_REQUEST',
            payload: new Promise(() => 'hello')
        });
    });
    it('should return deleted comment', () => {
        expect(deleteCommentAction(1, 'status')).toEqual({
            type: 'DELETE_COMMENT',
            payload: new Promise(() => 'hello')
        });
    });
});
