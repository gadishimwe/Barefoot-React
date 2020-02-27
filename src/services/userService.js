import http from './httpService';

export const userRoleService = (page = 1, limit = 20) => {
	const response = http.get(`/api/users/settings/view-users-roles?page=${page}&limit=${limit}`);

	return response;
};

export const updateUserRoleService = (userEmail, userRole) => {
	const result = http.patch('/api/users/settings/roles', { userEmail, userRole });
	return result;
};

export const getManagersService = () => {
	const result = http.get('/api/users/settings/view-managers?page=1&limit=10');
	return result;
};

export const assignManagerToUser = (requesterId, lineManagerId) => {
	const result = http.patch(`/api/users/${requesterId}`, { lineManagerId });
	return result;
};

userRoleService();
