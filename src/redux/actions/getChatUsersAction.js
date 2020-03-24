import { GET_CHAT_USERS, UPDATE_STATUS } from './actionTypes';
import httpService from '../../services/httpService';

export const getChatUser = () => {
	return {
		type: GET_CHAT_USERS,
		payload: httpService.get('/api/chat/users')
	};
};
export const updateStatus = ({ userEmail, status, lastActivity }) => {
	return {
		type: UPDATE_STATUS,
		payload: { userEmail, status, lastActivity }
	};
};
