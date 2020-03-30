/* eslint-disable no-undef */
import { initialState, reducer } from '../../redux/reducers/chatReducer';

describe('Test chat reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, { type: 'SET_CURRENT_USER_REJECTED' })).toEqual(initialState);
	});
	it('should return users', () => {
		expect(
			reducer(undefined, {
				type: 'GET_CHAT_USERS_FULFILLED',
				payload: { data: { data: [1, 2, 3] } }
			})
		).toEqual({
			...initialState,
			allUsers: [1, 2, 3]
		});
	});
	it('should return initial state', () => {
		expect(reducer(undefined, { type: 'GET_CHAT_USERS_PENDING' })).toEqual(initialState);
	});
	it('should return initial state', () => {
		expect(reducer(undefined, { type: 'GET_CHAT_USERS_REJECTED' })).toEqual(initialState);
	});
	it('should return messages', () => {
		expect(
			reducer(undefined, {
				type: 'GET_MESSAGES',
				payload: {
					chatUser: 'user',
					response: { data: { data: { unread: 2, messages: ['messages'] } } }
				}
			})
		).toEqual({
			...initialState,
			conversations: [
				...initialState.conversations,
				{ chatUser: 'user', unread: 2, messages: ['messages'] }
			]
		});
	});
	it('should return selected conversation', () => {
		expect(
			reducer(
				{ ...initialState, conversations: [1, 2, 3] },
				{
					type: 'SETECT_CONVERSATION',
					payload: {
						index: 1,
						conversation: 1
					}
				}
			)
		).toEqual({
			...initialState,
			selectedConversation: 1,
			conversations: [
				1,
				{
					unread: 0
				},
				3
			]
		});
	});
	it('should return appended message', () => {
		expect(
			reducer(
				{ ...initialState, selectedConversation: { messages: ['message'] } },
				{ type: 'APPEND_MESSAGE', payload: 'message' }
			)
		).toEqual({
			...initialState,
			selectedConversation: {
				...initialState.selectedConversation,
				messages: ['message', 'message']
			}
		});
	});
	it('should return sent message', () => {
		expect(
			reducer(
				{
					...initialState,
					selectedConversation: { messages: [{ message: { message: 'message' } }] }
				},
				{ type: 'SEND_MESSAGE_FULFILLED', payload: { data: { data: 'message' } } }
			)
		).toEqual({
			...initialState,
			selectedConversation: {
				messages: ['message']
			}
		});
	});
	it('should return initial state', () => {
		expect(reducer(undefined, { type: 'SEND_MESSAGE_PENDING' })).toEqual(initialState);
	});
	it('should return initial state', () => {
		expect(reducer(undefined, { type: 'SEND_MESSAGE_REJECTED' })).toEqual(initialState);
	});
	it('should return initial state', () => {
		expect(reducer(undefined, { type: 'RESET_SELECTED' })).toEqual(initialState);
	});
	it('should return new message', () => {
		expect(
			reducer(
				{
					conversations: [{ chatUser: { email: 'email' }, unread: 2, messages: [1, 2, 3] }],
					selectedConversation: undefined
				},
				{ type: 'NEW_MESSAGE', payload: { sender: 'email', message: 'kk' } }
			)
		).toEqual({
			conversations: [
				{
					chatUser: { email: 'email' },
					unread: 3,
					messages: [1, 2, 3, { message: 'kk', sender: 'email' }]
				}
			],
			selectedConversation: undefined
		});
	});
	it('should return emoji', () => {
		expect(
			reducer(
				{
					inputValue: { id: 1, value: 'value' }
				},
				{ type: 'SET_INPUT', payload: 'ok' }
			)
		).toEqual({
			inputValue: { id: 2, value: 'ok' }
		});
	});
	it('should return message', () => {
		expect(
			reducer(
				{
					inputValue: { id: 1, value: 'value' }
				},
				{ type: 'UNSET_INPUT', payload: 'ok' }
			)
		).toEqual({
			inputValue: { id: 0, value: undefined }
		});
	});
	it('should return search results', () => {
		expect(
			reducer(
				{
					conversations: [{ chatUser: { firstName: 'first', lastName: 'last' } }]
				},
				{ type: 'SEARCH', payload: 'fi' }
			)
		).toEqual({
			conversations: [{ chatUser: { firstName: 'first', lastName: 'last' } }],
			searchResult: [{ chatUser: { firstName: 'first', lastName: 'last' } }]
		});
	});
	it('should return search results', () => {
		expect(
			reducer(
				{
					conversations: [{ chatUser: { firstName: 'first', lastName: 'last' } }]
				},
				{ type: 'SEARCH', payload: 'las' }
			)
		).toEqual({
			conversations: [{ chatUser: { firstName: 'first', lastName: 'last' } }],
			searchResult: [{ chatUser: { firstName: 'first', lastName: 'last' } }]
		});
	});
	it('should return search results', () => {
		expect(
			reducer(
				{
					conversations: [{ chatUser: { firstName: 'first', lastName: 'last' } }]
				},
				{ type: 'SEARCH', payload: 'first las' }
			)
		).toEqual({
			conversations: [{ chatUser: { firstName: 'first', lastName: 'last' } }],
			searchResult: [{ chatUser: { firstName: 'first', lastName: 'last' } }]
		});
	});
	it('should return changed status', () => {
		expect(
			reducer(
				{
					conversations: [{ chatUser: { email: 'email' } }]
				},
				{
					type: 'UPDATE_STATUS',
					payload: { userEmail: 'email', lastActivity: 'last', status: 'online' }
				}
			)
		).toEqual({
			conversations: [
				{
					chatUser: {
						email: 'email',
						isOnline: 'online',
						lastActivity: 'last'
					}
				}
			]
		});
	});
});
