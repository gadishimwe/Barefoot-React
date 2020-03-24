import { SETECT_CONVERSATION, RESET_SELECTED } from './actionTypes';
import httpService from '../../services/httpService';

export const selectConversation = (conversation, index) => {
	httpService.patch(`/api/chat/mark-all-as-read?chatUser=${conversation.chatUser.email}`);
	return {
		type: SETECT_CONVERSATION,
		payload: { conversation, index }
	};
};
export const resetSelected = () => ({ type: RESET_SELECTED });
