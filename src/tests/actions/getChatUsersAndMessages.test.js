/* eslint-disable no-undef */
import { updateStatus } from '../../redux/actions/getChatUsersAction';
import { getMessages, handleNewMessage } from '../../redux/actions/getMessagesActions';

describe('Test get chat users', () => {
	it('should return status update', () => {
		expect(updateStatus({ userEmail: 1, status: 2, lastActivity: 3 })).toEqual({
			type: 'UPDATE_STATUS',
			payload: { userEmail: 1, status: 2, lastActivity: 3 }
		});
	});
	it('should return  messages', () => {
		expect(getMessages({ email: 'email' })).toEqual(new Promise(() => 'hello'));
	});
	it('should return  messages', () => {
		expect(handleNewMessage('message')).toEqual({
			type: 'NEW_MESSAGE',
			payload: 'message'
		});
	});
});
