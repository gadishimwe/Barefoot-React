import { GET_MESSAGES, NEW_MESSAGE } from './actionTypes';
import httpService from '../../services/httpService';

export const getMessages = async chatUser => {
	const response = await httpService.get(`/api/chat?chatUser=${chatUser.email}`);
	return {
		type: GET_MESSAGES,
		payload: { chatUser, response }
	};
};
export const handleNewMessage = message => {
	return {
		type: NEW_MESSAGE,
		payload: message
	};
};
