/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import updateTripReducer from '../../redux/reducers/editTripReducer';
import { UPDATE_TRIP } from '../../redux/actions/actionTypes';
import { pending, fulfilled, rejected } from '../../helpers/utils/action.utils';

describe('Update Open Trip Reducer', () => {
  it('Should return unchanged initial state: Unknown actiontype', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      newTrip: '',
      loading: false,
      message: ''
    };
    expect(updateTripReducer(undefined, action)).toEqual(initialState);
  });

  it('Should successfully change the initial state: FULFILLED', () => {
    const action = {
      type: fulfilled(UPDATE_TRIP),
      payload: {
        data: {
          message: 'Trip Updated successfully',
          data:
          {
            id: 4,
            tripType: "multi-city",
            requestId: 3,
            userId: 1,
            originId: 7,
            destinationId: 6,
            departureDate: "2020-03-19T00:00:00.000Z",
            returnDate: null,
            travelReasons: "",
            accommodationId: 7,
            createdAt: '2020-03-03T18:48:11.570Z',
            updatedAt: '2020-03-03T19:41:47.660Z'
          }
        }
      }
    };
    const expectedState = {
      loading: false,
      message: 'Trip Updated successfully',
      newTrip: {
        id: 4,
        tripType: "multi-city",
        requestId: 3,
        userId: 1,
        originId: 7,
        destinationId: 6,
        departureDate: "2020-03-19T00:00:00.000Z",
        returnDate: null,
        travelReasons: "",
        accommodationId: 7,
        createdAt: '2020-03-03T18:48:11.570Z',
        updatedAt: '2020-03-03T19:41:47.660Z'
      }
    };
    expect(updateTripReducer(undefined, action)).toEqual(expectedState);
  });

  it('Should Not change the initial state: PENDING', () => {
    const action = {
      type: pending(UPDATE_TRIP)
    };
    const expectedState = {
      newTrip: '',
      loading: true,
      message: ''
    };
    expect(updateTripReducer(undefined, action)).toEqual(expectedState);
  });

  it('Should Not change the initial state: REJECTED', () => {
    const action = {
      type: rejected(UPDATE_TRIP),
      payload: {
        response: {
          data: {
            message: 'Trip not updated'
          }
        }
      }
    };
    const expectedState = {
      newTrip: '',
      loading: false,
      message: 'Trip not updated'
    };
    expect(updateTripReducer(undefined, action)).toEqual(expectedState);
  });

});
