import { USER_ROLE, UPDATE_USER_ROLE } from './actionTypes';

import { userRoleService, updateUserRoleService } from '../../services/userService';

// eslint-disable-next-line import/prefer-default-export
export const userRoleAction = () => {
	return {
		type: USER_ROLE,
		payload: userRoleService(),
	};
};

export const updateUserRole = (userEmail, userRole) => {
	return {
		type: UPDATE_USER_ROLE,
		payload: updateUserRoleService(userEmail, userRole),
	}
}
