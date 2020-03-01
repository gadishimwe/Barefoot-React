import { GET_LOCATIONS } from './actionTypes';
import httpService from '../../services/httpService';

export default token => {
	return {
		type: GET_LOCATIONS,
		payload: httpService.get('/api/trips/locations', { authorization: token })
	};
};
