import { GET_ACCOMMODATIONS } from './actionTypes';
import httpService from '../../services/httpService';

export default () => {
	return {
		type: GET_ACCOMMODATIONS,
		payload: httpService.get('/api/accommodations')
	};
};
