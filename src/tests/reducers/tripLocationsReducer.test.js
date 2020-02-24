/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import tripLocationsReducer from '../../redux/reducers/tripLocationsReducer';
import { FIND_TRIP_LOCATIONS } from '../../redux/actions/actionTypes';
import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

describe('Trip request Reducer', () => {

    it('Should return unchanged initial state: Unknown actiontype', () => {
        const action = { type: 'dummy_action' };
        const initialState = { data: '' };
        expect(tripLocationsReducer(undefined, action)).toEqual(initialState);
    });

    it('Should successfully change the initial state: FULFILLED', () => {
        const action = {
            type: fulfilled(FIND_TRIP_LOCATIONS),
            payload: {
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
            }
        };
        const expectedState = {
            data: [
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
        };
        expect(tripLocationsReducer(undefined, action)).toEqual(expectedState);
    });

    it('Should Not change the initial state: PENDING', () => {
        const action = {
            type: pending(FIND_TRIP_LOCATIONS)
        };
        const initialState = { data: '' };
        expect(tripLocationsReducer(undefined, action)).toEqual(initialState);
    });

    it('Should Not change the initial state: REJECTED', () => {
        const action = {
            type: rejected(FIND_TRIP_LOCATIONS)
        };
        const initialState = { data: '' };
        expect(tripLocationsReducer(undefined, action)).toEqual(initialState);
    });

});
