/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import tripRequestsReducer from '../../redux/reducers/tripRequestsReducer';
import { FIND_TRIP_REQUESTS } from '../../redux/actions/actionTypes';
import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

describe('Trip request Reducer', () => {

    it('Should return unchanged initial state: Unknown actiontype', () => {
        const action = { type: 'dummy_action' };
        const initialState = { data: '' };
        expect(tripRequestsReducer(undefined, action)).toEqual(initialState);
    });

    it('Should successfully change the initial state: FULFILLED', () => {
        const action = {
            type: fulfilled(FIND_TRIP_REQUESTS),
            payload: {
                data: {
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
                }
            }
        };
        const expectedState = {
            data: [
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
        };
        expect(tripRequestsReducer(undefined, action)).toEqual(expectedState);
    });

    it('Should Not change the initial state: PENDING', () => {
        const action = {
            type: pending(FIND_TRIP_REQUESTS)
        };
        const initialState = { data: '' };
        expect(tripRequestsReducer(undefined, action)).toEqual(initialState);
    });

    it('Should Not change the initial state: REJECTED', () => {
        const action = {
            type: rejected(FIND_TRIP_REQUESTS)
        };
        const initialState = { data: '' };
        expect(tripRequestsReducer(undefined, action)).toEqual(initialState);
    });

});
