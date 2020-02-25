import { USER_ROLE, UPDATE_USER_ROLE, GET_MANAGERS, ASSIGN_MANAGER } from './actionTypes';

import {
	userRoleService,
	updateUserRoleService,
	getManagersService,
	assignManagerToUser
} from '../../services/userService';

// eslint-disable-next-line import/prefer-default-export
export const userRoleAction = () => {
	return {
		type: USER_ROLE,
		payload: userRoleService()
	};
};

export const updateUserRole = (userEmail, userRole) => {
	return {
		type: UPDATE_USER_ROLE,
		payload: updateUserRoleService(userEmail, userRole)
	};
};

export const getManagersAction = () => {
	return {
		type: GET_MANAGERS,
		payload: getManagersService()
	};
};

export const assignManagerAction = (requesterId, lineManagerId) => {
	return {
		type: ASSIGN_MANAGER,
		payload: assignManagerToUser(requesterId, lineManagerId)
	};
};
