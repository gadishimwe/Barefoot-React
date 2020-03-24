import { SEARCH } from './actionTypes';

export default query => {
	return {
		type: SEARCH,
		payload: query
	};
};
