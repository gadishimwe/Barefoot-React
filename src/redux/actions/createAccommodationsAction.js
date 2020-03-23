import { ADD_ACCOMMODATION } from './actionTypes';
import accommodationService from '../../services/accommodationService';

export default formData => {
	return {
		type: ADD_ACCOMMODATION,
		payload: accommodationService(formData)
	};
};
