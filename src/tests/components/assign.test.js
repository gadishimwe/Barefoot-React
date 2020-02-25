/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AssignManager from '../../components/AssignManager';

const setUp = () => {
	const store = configureStore([thunk])({
		userReducer: {
			managerData: [{ firstName: 'Manager', lastName: 'User' }],
			data: [
				{
					users: {
						firstName: 'John',
						lastName: 'Hello',
						email: 'email@gmm.cc',
						role: 'requestor'
					}
				}
			]
		}
	});
	const wrapper = mount(
		<Provider store={store}>
			<AssignManager />
		</Provider>
	);
	return wrapper;
};

describe('AssignManager Component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});

	it('Should dispatch values', () => {
		const form = component.find('[data-test="assign-manager"]');
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		const preventDefault = jest.fn();
		form.props().onSubmit({ requesterId: '120', lineManagerId: '911', preventDefault });
		expect(onSubmitSpy).toBeCalled();
	});

	it('Should dispatch multiple values', () => {
		const button = component.find('[data-test="assign-multiple"]').at(1);
		const onClickSpy = jest.spyOn(button.props(), 'onClick');
		const preventDefault = jest.fn();
		button.props().onClick({ requesterId: '120', lineManagerId: '911', preventDefault });
		expect(onClickSpy).toBeCalled();
	});
});
