/* eslint-disable no-undef */

import React from 'react';
import { Provider } from 'react-redux';
import { Formik } from 'formik';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Alert from '@material-ui/lab/Alert';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../../redux/store';
import Multicity, { countryToFlag, disabledHandler } from '../../../components/trips/Multi-city';
import Trips, { handleTabsChange } from '../../../components/trips/trips';
import Return from '../../../components/trips/Return';

describe('Test multi city trip', () => {
	let component;
	beforeEach(() => {
		const store = configureStore();
		component = mount(
			<Provider store={store}>
				<Multicity />
			</Provider>
		);
	});
	it('Should dispatch values', () => {
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		form.props().onSubmit({
			trips: [
				{
					origin: { id: 1, code: 'AD', country: 'Andorra' },
					destination: { id: 2, code: 'AE', country: 'United Arab Emirates' },
					accommodation: '',
					travelReasons: 'travvatat',
					departureDate: new Date()
				},
				{
					origin: { id: 2, code: 'AE', country: 'United Arab Emirates' },
					destination: { id: 5, code: 'AI', country: 'Anguilla' },
					accommodation: '',
					travelReasons: 'deygdyegd',
					departureDate: new Date()
				}
			]
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should dispatch values', () => {
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		form.props().onSubmit({
			trips: [
				{
					origin: { id: 1, code: 'AD', country: 'Andorra' },
					destination: { id: 2, code: 'AE', country: 'United Arab Emirates' },
					accommodation: { id: 1 },
					travelReasons: 'travvatat',
					departureDate: new Date()
				},
				{
					origin: { id: 2, code: 'AE', country: 'United Arab Emirates' },
					destination: { id: 5, code: 'AI', country: 'Anguilla' },
					accommodation: { id: 2 },
					travelReasons: 'deygdyegd',
					departureDate: new Date()
				}
			]
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should add another city trip', () => {
		const addCityButton = component.find('[data-test="addCityButton"]').at(1);
		const onSubmitSpy = jest.spyOn(addCityButton.props(), 'onClick');
		addCityButton.props().onClick();
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should remove another city trip', () => {
		const store = mockConfigureStore([thunk])({
			multiCityReducer: {
				loading: false,
				messages: '',
				trips: [
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					}
				],
				locations: []
			}
		});
		const component2 = mount(
			<Provider store={store}>
				<Multicity />
			</Provider>
		);
		const removeCityButton = component2.find('[data-test="removeCityButton"]').at(1);
		const onSubmitSpy = jest.spyOn(removeCityButton.props(), 'onClick');
		removeCityButton.props().onClick();
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should display country flags', () => {
		const flag = countryToFlag('RW');
		expect(flag).toEqual('🇷🇼');
	});
	it('Should disable button or enable it', () => {
		const isDiasabled = disabledHandler(
			{
				values: { trips: [{ origin: 'nn', destination: 'bb', travelReasons: 'gg' }] }
			},
			{ loading: false }
		);
		expect(isDiasabled).toEqual(false);
	});
});
describe('Test validations', () => {
	it('should validate trip inputs', () => {
		const store = mockConfigureStore([thunk])({
			multiCityReducer: {
				loading: false,
				messages: [['error', 'error2']],
				trips: [
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					}
				],
				locations: []
			}
		});
		const component = mount(
			<Provider store={store}>
				<Multicity />
			</Provider>
		);
		expect(component.find(Alert).text()).toEqual('*error*error2');
	});
	it('should validate trip inputs', () => {
		const store = mockConfigureStore([thunk])({
			multiCityReducer: {
				loading: false,
				messages: 'errors',
				trips: [
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					}
				],
				locations: []
			}
		});
		const component = mount(
			<Provider store={store}>
				<Multicity />
			</Provider>
		);
		expect(component.find(Alert).text()).toEqual('*errors');
	});
	it('should validate trip inputs', () => {
		const store = mockConfigureStore([thunk])({
			multiCityReducer: {
				loading: false,
				messages: 'Trip request is successfully created',
				trips: [
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						accommodation: '',
						travelReasons: '',
						departureDate: new Date()
					}
				],
				locations: []
			}
		});
		const component = mount(
			<Provider store={store}>
				<Multicity />
			</Provider>
		);
		expect(component.find(Alert).text()).toEqual('*Trip request is successfully created');
	});
});
describe('Test trip tabs', () => {
	it('Should render the multi city trip tab', () => {
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<Trips match={{ params: { type: 'multi-city-trip' } }} />
			</Provider>
		);
		handleTabsChange([1, 2], 3);
		expect(component.exists('multiCityForm'));
	});
	it('Should render the return trip tab', () => {
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<Trips match={{ params: { type: 'return-trip' } }} />
			</Provider>
		);
		expect(component.find(Return).text()).toEqual('Return trip');
	});
	it('Should render the one way trip tab', () => {
		const store = configureStore();
		mount(
			<Provider store={store}>
				<BrowserRouter>
					<Trips match={{ params: { type: 'undefined' } }} />
				</BrowserRouter>
			</Provider>
		);
	});
});
