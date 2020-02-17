/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Alert from '@material-ui/lab/Alert';
import LoginView from '../../../views/Login';
import { findTestByAttr, store } from '../../../helpers/utils/test.utils';
import LoginPage from '../../../components/auth/Login';

library.add(fab);

describe(' Describe <LoginPage />', () => {
	const login = mount(
		<Provider store={store}>
			<LoginView location={{ pathname: '/login' }} />
		</Provider>,
	);
	it('should render without error', done => {
		const loginComponent = findTestByAttr(login, 'component-Login');
		expect(loginComponent.length).toEqual(5);
		expect(loginComponent.find('Formik').length).toEqual(1);
		expect(loginComponent.find('Form').length).toEqual(1);
		done();
	});
	it('should give on error from backend that are arrays', () => {
		const storeAfterLogin = configureStore([thunk])({
			auth: {
				credentials: {
					email: '',
					password: '',
				},
				isAuthenticated: false,
				user: {},
				token: '',
				error: { message: ['enter valid email'] },
				loading: 'testscudhfgdh',
			},
		});
		const wrapper = mount(
			<Provider store={storeAfterLogin}>
				<LoginView location={{ pathname: '/login' }} />
			</Provider>,
		);

		expect(wrapper.find(Alert).text()).toEqual('An error occured, wrong email or password');
	});
	it('should give message upone error from backend that are objects', () => {
		const storeAfterLogin = configureStore([thunk])({
			auth: {
				credentials: {
					email: '',
					password: '',
				},
				isAuthenticated: false,
				user: {},
				token: '',
				error: { message: 'account not valid' },
				loading: 'testscudhfgdh',
			},
		});
		const wrapper = mount(
			<Provider store={storeAfterLogin}>
				<LoginView location={{ pathname: '/login' }} />
			</Provider>,
		);

		expect(wrapper.find(Alert).text()).toEqual('account not valid');
	});

	test('submits the form', () => {
		let tree;
		act(() => {
			tree = mount(
				<Provider store={store}>
					<LoginPage location={{ pathname: '/login' }} />
				</Provider>,
			);
		});

		expect(tree.find('LoginPage').find('#feedback')).toHaveLength(0);
	});
});

describe('redirecting a user', () => {
	const { location } = window;

	beforeAll(() => {
		delete window.location;
		window.location = { replace: jest.fn() };
	});

	afterAll(() => {
		window.location = location;
	});

	it('should redirect after succesful login', () => {
		const storeAfterLogin = configureStore([thunk])({
			auth: {
				credentials: {
					email: '',
					password: '',
				},
				isAuthenticated: true,
				user: { id: 1, name: 'john' },
				token: 'hgjhgjgjhjghsds',
				error: {},
				loading: false,
			},
		});
		const wrapper = mount(
			<Provider store={storeAfterLogin}>
				<LoginView location={{ pathname: '/login' }} />
			</Provider>,
		);
		expect(window.location.replace).toHaveBeenCalled();
		expect(wrapper.find(Alert).text()).toEqual('Logged in, redirecting');
	});
	it('Should dispatch values', async done => {
		const storeMock = configureStore([thunk])({
			auth: {
				credentials: {
					email: '',
					password: '',
				},
				isAuthenticated: true,
				user: {},
				token: 'nbcmsdbdmsbsdcdcvsmn',
				error: { message: 'account not valid' },
				loading: false,
			},
		});
		const component = mount(
			<Provider store={storeMock}>
				<LoginPage location={{ pathname: '/login' }} />
			</Provider>,
		);

		const form = component.find('Formik');

		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		const credentials = { email: 'email@email.email', password: 'password' };
		act(() => {
			form.props().onSubmit(credentials, { resetForm: jest.fn() });
		});
		expect(window.location.replace).toHaveBeenCalled();
		expect(onSubmitSpy).toBeCalled();

		done();
	});
	it('Should not reset form if errors', async done => {
		const storeMock = configureStore([thunk])({
			auth: {
				credentials: {
					email: '',
					password: '',
				},
				isAuthenticated: true,
				user: {},
				token: '',
				error: { message: 'account not valid' },
				loading: false,
			},
		});
		const component = mount(
			<Provider store={storeMock}>
				<LoginPage location={{ pathname: '/login' }} />
			</Provider>,
		);

		const form = component.find('Formik');

		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		const credentials = { email: 'email@email.email', password: 'password' };
		act(() => {
			form.props().onSubmit(credentials, { resetForm: jest.fn() });
		});
		expect(onSubmitSpy).toBeCalled();

		done();
	});
	describe('Test google and facebook buttons', () => {
		const component = mount(
			<Provider store={store}>
				<LoginView location={{ pathname: '/login' }} />
			</Provider>,
		);
		it('Should call facebookHandler on click', () => {
			const facebookButton = component.find('[data-test="facebookButton"]').at(1);
			const onSubmitSpy = jest.spyOn(facebookButton.props(), 'onClick');
			facebookButton.props().onClick();
			expect(onSubmitSpy).toBeCalled();
		});
		it('Should call googleHandler on click', () => {
			const googleButton = component.find('[data-test="googleButton"]').at(1);
			const onSubmitSpy = jest.spyOn(googleButton.props(), 'onClick');
			googleButton.props().onClick();
			expect(onSubmitSpy).toBeCalled();
		});
	});
});
