/* eslint-disable no-undef */
import { assignManagerAction } from '../../redux/actions/userAction';

describe('Test assign manager', () => {
	it('should return assigned manager', () => {
		expect(assignManagerAction(1, 2)).toEqual({
			type: 'ASSIGN_MANAGER',
			payload: new Promise(() => 'hello')
		});
	});
});
