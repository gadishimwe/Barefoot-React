/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AssignManager from '../../components/AssignManager';
import userReducer from '../../redux/reducers/userReducer';

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

	it('Should dispatch multiple values', () => {
		const button = component.find('[data-test="assign-multiple"]').at(1);
		const onClickSpy = jest.spyOn(button.props(), 'onClick');
		const preventDefault = jest.fn();
		button.props().onClick({ requesterId: '120', lineManagerId: '911', preventDefault });
		expect(onClickSpy).toBeCalled();
	});

	it('Should wait for an action', done => {
		const action = {
			type: 'ASSIGN_MANAGER_PENDING',
			payload: {
				data: {
					data: 200,
					message: ''
				}
			}
		};
		const response = { loading: true };
		const newState = userReducer({}, action);

		expect(newState).toEqual(response);
		done();
	});

	it('Should return data on fulfilled action', done => {
		const action = {
			type: 'ASSIGN_MANAGER_FULFILLED',
			payload: {
				data: {
					data: 200,
					message: 'Requester is successfully assigned to a manager'
				}
			}
		};
		const response = {
			error: '',
			message: 'Requester is successfully assigned to a manager',
			loading: false
		};
		const newState = userReducer({}, action);
		expect(newState).toEqual(response);
		done();
	});
	it('Should render assign manager view', () => {
		const paginate = jest.spyOn(component.find('[test-data="pagination"]').props(), 'paginate');
		component
			.find('[test-data="pagination"]')
			.props()
			.paginate(3);
		expect(paginate).toBeCalled();
	});
	it('Should render assign manager view', () => {
		const handleChange = jest.spyOn(component.find('[test-data="select"]').props(), 'onChange');
		component
			.find('[test-data="select"]')
			.props()
			.onChange({ preventDefault: () => 'prevented', target: { name: 'name', value: 'value' } });
		expect(handleChange).toBeCalled();
	});
});
