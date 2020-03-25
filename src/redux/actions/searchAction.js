import { SEARCH } from './actionTypes';
import searchService from '../../services/searchService';

const searchAction = (location, name, status, departureDate) => {
	return {
		type: SEARCH,
		payload: searchService(location, name, status, departureDate)
	};
};

export default searchAction;
