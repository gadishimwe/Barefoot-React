import { TRIP_STATS } from '../actions/actionTypes';

import { pending, fulfilled } from '../../helpers/utils/action.utils';

const initialState = {
	data: ''
};

const tripStatsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(TRIP_STATS):
			return {
				...state
			};
		case fulfilled(TRIP_STATS):
			return {
				...state,
				data: action.payload.data.data
			};
		default:
			return {
				...state
			};
	}
};

export default tripStatsReducer;
