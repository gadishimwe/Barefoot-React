import { APPEND_MESSAGE, SEND_MESSAGE } from './actionTypes';
import httpService from '../../services/httpService';

export const appendMessage = ({ currentUser, chatUser, value }) => {
	return {
		type: APPEND_MESSAGE,
		payload: {
			id: new Date(),
			sender: currentUser.email,
			receiver: chatUser.email,
			message: value,
			isRead: true,
			createdAt: 'sending...'
		}
	};
};
export const sendMessage = ({ chatUser, value }) => {
	return {
		type: SEND_MESSAGE,
		payload: httpService.post('/api/chat', { receiver: chatUser.email, message: value })
	};
};
