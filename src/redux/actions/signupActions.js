import { VALIDATE_SIGNUP } from './actionTypes';
import signupService from '../../services/signupService';

export default values => {
	return {
		type: VALIDATE_SIGNUP,
		payload: signupService(values)
	};
};
