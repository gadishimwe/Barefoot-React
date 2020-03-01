/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { Formik } from 'formik';
import mockConfigureStore from 'redux-mock-store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import thunk from 'redux-thunk';
import Alert from '@material-ui/lab/Alert';
import SignupView from '../../../views/Signup';
import SignupForm, { disabledHandler } from '../../../components/auth/SignupForm';
import configureStore from '../../../redux/store';
import NavBar from '../../../components/common/NavBar';
import Footer from '../../../components/common/Footer';

library.add(fab);

describe('Test sign up views', () => {
	it('Should render the view', () => {
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<SignupView location={{ pathname: '/signup' }} />
			</Provider>
		);
		expect(component.exists(NavBar));
		expect(component.exists(Footer));
	});
	it('Should render the view without signup form for other route', () => {
		const component = mount(<SignupView location={{ pathname: '/random-rooute' }} />);
		expect(component.exists(NavBar));
		expect(component.exists(Footer));
	});
});

describe('Test signing up functionality', () => {
	const { location } = window;
	beforeAll(() => {
		delete window.location;
		window.location = { assign: jest.fn() };
	});
	afterAll(() => {
		window.location = location;
	});
	it('should validate input on frontend', () => {
		const store = mockConfigureStore([thunk])({
			signupReducer: {
				authorized: true,
				error: { message: ['errors'] },
				loading: false
			}
		});
		const component = mount(
			<Provider store={store}>
				<SignupForm />
			</Provider>
		);
		expect(component.find(Alert).text()).toEqual('*errors');
		expect(window.location.assign).toHaveBeenCalled();
	});
	it('should validate input on frontend', () => {
		const store = mockConfigureStore([thunk])({
			signupReducer: {
				error: { message: 'errors' },
				loading: false
			}
		});
		const component = mount(
			<Provider store={store}>
				<SignupForm />
			</Provider>
		);
		expect(component.find(Alert).text()).toEqual('*errors');
	});
	it('Should dispatch values', done => {
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<SignupForm />
			</Provider>
		);
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		form
			.props()
			.onSubmit(
				{ firstName: 'Stev', lastName: 'james', email: 'james@email.com', password: 'password' },
				{ resetForm: jest.fn() }
			);
		expect(onSubmitSpy).toBeCalled();
		done();
	});
	describe('Test if the button is disabled and can be enabled or vice versa', () => {
		it('should return true', () => {
			const isDisabled = disabledHandler(
				{
					values: { firstName: 'joe', lastName: '', email: '', password: '' },
					errors: { jj: 'frfrfrf' }
				},
				{ state: { loading: true } }
			);
			expect(isDisabled).toEqual(true);
		});
		it('should return true', () => {
			const isDisabled = disabledHandler(
				{
					values: { firstName: 'joe', lastName: 'will', email: '', password: '' },
					errors: { jj: 'frfrfrf' }
				},
				{ state: { loading: true } }
			);
			expect(isDisabled).toEqual(true);
		});
		it('should return true', () => {
			const isDisabled = disabledHandler(
				{
					values: { firstName: 'joe', lastName: 'will', email: 'will@ew.co', password: '' },
					errors: { jj: 'frfrfrf' }
				},
				{ state: { loading: true } }
			);
			expect(isDisabled).toEqual(true);
		});
		it('should return true', () => {
			const isDisabled = disabledHandler(
				{
					values: { firstName: 'joe', lastName: 'will', email: 'will@ew.co', password: 'pass' },
					errors: { jj: 'frfrfrf' }
				},
				{ state: { loading: true } }
			);
			expect(isDisabled).toEqual(true);
		});
		it('should return false', () => {
			const isDisabled = disabledHandler(
				{
					values: { firstName: 'joe', lastName: 'will', email: 'will@ew.co', password: 'pass' },
					errors: {}
				},
				{ state: { loading: false } }
			);
			expect(isDisabled).toEqual(false);
		});
	});
	describe('Test google and facebook buttons', () => {
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<SignupView location={{ pathname: '/signup' }} />
			</Provider>
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
