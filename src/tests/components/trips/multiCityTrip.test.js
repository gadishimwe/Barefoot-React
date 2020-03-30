/* eslint-disable no-undef */

import React from 'react';
import { Provider } from 'react-redux';
import { Formik } from 'formik';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Alert from '@material-ui/lab/Alert';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import configureStore from '../../../redux/store';
import Multicity, { countryToFlag, disabledHandler } from '../../../components/trips/Multi-city';
import Trips, { handleTabsChange } from '../../../components/trips/trips';

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
		act(() => {
			form.props().onSubmit({
				trips: [
					{
						origin: { id: 1, code: 'AD', country: 'Andorra' },
						destination: { id: 2, code: 'AE', country: 'United Arab Emirates' },
						travelReasons: 'travvatat',
						departureDate: new Date()
					},
					{
						origin: { id: 2, code: 'AE', country: 'United Arab Emirates' },
						destination: { id: 5, code: 'AI', country: 'Anguilla' },
						travelReasons: 'deygdyegd',
						departureDate: new Date()
					}
				]
			});
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should dispatch values', () => {
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		act(() => {
			form.props().onSubmit({
				trips: [
					{
						origin: { id: 1, code: 'AD', country: 'Andorra' },
						destination: { id: 2, code: 'AE', country: 'United Arab Emirates' },
						travelReasons: 'travvatat',
						departureDate: new Date()
					},
					{
						origin: { id: 2, code: 'AE', country: 'United Arab Emirates' },
						destination: { id: 5, code: 'AI', country: 'Anguilla' },
						travelReasons: 'deygdyegd',
						departureDate: new Date()
					}
				]
			});
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should add another city trip', () => {
		const addCityButton = component.find('[data-test="addCityButton"]').at(1);
		const onSubmitSpy = jest.spyOn(addCityButton.props(), 'onClick');
		act(() => {
			addCityButton.props().onClick();
		});
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
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
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
		act(() => {
			removeCityButton.props().onClick();
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should display country flags', () => {
		const flag = countryToFlag('RW');
		expect(flag).toEqual('🇷🇼');
	});
	it('Should disable button or enable it', () => {
		const isDiasabled = disabledHandler(
			{
				values: { trips: [{ origin: 'nn', destination: 'bb', travelReasons: 'gg' }] },
				errors: {}
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
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
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
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
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
						travelReasons: '',
						departureDate: new Date()
					},
					{
						origin: '',
						destination: '',
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
		const handleChange = jest.spyOn(
			component
				.find('[test-data="origin"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="origin"]')
			.at(1)
			.props()
			.onChange();
		const getOptionLabel = jest.spyOn(
			component
				.find('[test-data="origin"]')
				.at(1)
				.props(),
			'getOptionLabel'
		);
		component
			.find('[test-data="origin"]')
			.at(1)
			.props()
			.getOptionLabel({ country: 'country' });
		const renderOption = jest.spyOn(
			component
				.find('[test-data="origin"]')
				.at(1)
				.props(),
			'renderOption'
		);
		component
			.find('[test-data="origin"]')
			.at(1)
			.props()
			.renderOption({ code: 'RW' });
		const handleChange2 = jest.spyOn(
			component
				.find('[test-data="destination"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="destination"]')
			.at(1)
			.props()
			.onChange();
		const getOptionLabel2 = jest.spyOn(
			component
				.find('[test-data="destination"]')
				.at(1)
				.props(),
			'getOptionLabel'
		);
		component
			.find('[test-data="destination"]')
			.at(1)
			.props()
			.getOptionLabel({ country: 'country' });
		const renderOption2 = jest.spyOn(
			component
				.find('[test-data="destination"]')
				.at(1)
				.props(),
			'renderOption'
		);
		component
			.find('[test-data="destination"]')
			.at(1)
			.props()
			.renderOption({ code: 'RW' });
		expect(handleChange).toBeCalled();
		expect(renderOption).toBeCalled();
		expect(getOptionLabel).toBeCalled();
		expect(handleChange2).toBeCalled();
		expect(renderOption2).toBeCalled();
		expect(getOptionLabel2).toBeCalled();
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
		act(() => {
			handleTabsChange([1, 2], 3);
		});
		expect(component.exists('multiCityForm'));
	});
	it('Should render the return trip tab', () => {
		const store = configureStore();
		mount(
			<Provider store={store}>
				<BrowserRouter>
					<Trips match={{ params: { type: 'return-trip' } }} />
				</BrowserRouter>
			</Provider>
		);
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
