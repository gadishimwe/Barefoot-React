/* eslint-disable no-case-declarations */
import {
	GET_CHAT_USERS,
	GET_MESSAGES,
	SET_CURRENT_USER,
	SETECT_CONVERSATION,
	APPEND_MESSAGE,
	SEND_MESSAGE,
	RESET_SELECTED,
	NEW_MESSAGE,
	SET_INPUT,
	UNSET_INPUT,
	SEARCH,
	UPDATE_STATUS
} from '../actions/actionTypes';
import { rejected, fulfilled, pending } from '../../helpers/utils/action.utils';

export const initialState = {
	allUsers: [],
	conversations: [],
	currentUser: undefined,
	selectedConversation: undefined,
	inputValue: { id: 0, value: undefined },
	searchResult: undefined
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case fulfilled(SET_CURRENT_USER):
			return {
				...state,
				currentUser: { ...action.payload.data.data }
			};
		case pending(SET_CURRENT_USER):
			return {
				...state
			};
		case rejected(SET_CURRENT_USER):
			return {
				...state
			};
		case fulfilled(GET_CHAT_USERS):
			return {
				...state,
				allUsers: [...action.payload.data.data]
			};
		case pending(GET_CHAT_USERS):
			return {
				...state
			};
		case rejected(GET_CHAT_USERS):
			return {
				...state
			};
		case GET_MESSAGES:
			return {
				...state,
				conversations: [
					...state.conversations,
					{
						chatUser: action.payload.chatUser,
						unread: action.payload.response.data.data.unread,
						messages: [...action.payload.response.data.data.messages]
					}
				]
			};
		case SETECT_CONVERSATION:
			const newConversationList = [...state.conversations];
			newConversationList.splice(action.payload.index, 1, {
				...state.conversations[action.payload.index],
				unread: 0
			});
			return {
				...state,
				selectedConversation: action.payload.conversation,
				conversations: [...newConversationList]


			};
		case APPEND_MESSAGE:
			return {
				...state,
				selectedConversation: {
					...state.selectedConversation,
					messages: [...state.selectedConversation.messages, action.payload]
				}
			};
		case fulfilled(SEND_MESSAGE):
			const newMessages = [...state.selectedConversation.messages];
			newMessages.splice(
				state.selectedConversation.messages.findIndex(
					message => message.message === action.payload.data.data.message
				),
				1,
				action.payload.data.data
			);

			return {
				...state,
				selectedConversation: {
					...state.selectedConversation,
					messages: [...newMessages]
				}
			};
		case pending(SEND_MESSAGE):
			return {
				...state
			};
		case rejected(SEND_MESSAGE):
			return {
				...state
			};
		case RESET_SELECTED:
			return {
				...state,
				selectedConversation: undefined
			};
		case NEW_MESSAGE:
			const newConversationList1 = [...state.conversations];
			const indx = state.conversations.findIndex(
				conv => conv.chatUser.email === action.payload.sender
			);
			newConversationList1.splice(indx, 1, {
				...state.conversations[indx],
				unread: state.conversations[indx].unread + 1,
				messages: [...state.conversations[indx].messages, action.payload]
			});

			return {
				...state,
				selectedConversation:
					state.selectedConversation !== undefined
						? {
								...state.selectedConversation,
								messages: [...state.selectedConversation.messages, action.payload]
						  }
						: undefined,
				conversations: [...newConversationList1]
			};
		case SET_INPUT:
			return {
				...state,
				inputValue: { ...{ id: state.inputValue.id + 1, value: action.payload } }
			};
		case UNSET_INPUT:
			return {
				...state,
				inputValue: { ...{ id: 0, value: undefined } }
			};
		case SEARCH:
			return {
				...state,
				searchResult: [
					...state.conversations.filter(
						conv =>
							conv.chatUser.firstName.toLowerCase().startsWith(action.payload.toLowerCase()) ||
							conv.chatUser.lastName.toLowerCase().startsWith(action.payload.toLowerCase()) ||
							`${conv.chatUser.firstName.toLowerCase()} ${conv.chatUser.lastName.toLowerCase()}`.startsWith(
								action.payload.toLowerCase()
							)
					)
				]
			};
		case UPDATE_STATUS:
			const index = state.conversations.findIndex(
				conv => conv.chatUser.email === action.payload.userEmail
			);
			const conversationList = [...state.conversations];
			conversationList.splice(index, 1, {
				...state.conversations[index],
				chatUser: {
					...state.conversations[index].chatUser,
					isOnline: action.payload.status,
					lastActivity: action.payload.lastActivity
				}
			});

			return {
				...state,
				conversations: [...conversationList]
			};
		default:
			return state;
	}
};

export default reducer;
