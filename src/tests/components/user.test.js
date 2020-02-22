/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserRole from '../../components/UserRole';

const setUp = () => {
	const store = configureStore([thunk])({
		userReducer: {
			data: [
				{
					users: {
						firstName: 'John',
						lastName: 'Hello',
						email: 'email@gmm.cc',
						role: 'requestor',
					},
				},
			],
		},
	});
	const wrapper = mount(
		<Provider store={store}>
			<UserRole />
		</Provider>,
	);
	return wrapper;
};
describe('UserRole Component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});

	it('Should dispatch values', async done => {
		const form = component.find('[data-test="update-role"]');
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		const preventDefault = jest.fn();
		form.props().onSubmit({ userEmail: 'myemail@email.com', userRole: 'manager', preventDefault });
		expect(onSubmitSpy).toBeCalled();
		done();
	});
});
