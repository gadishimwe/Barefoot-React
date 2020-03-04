/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

import React from 'react';
import { Provider } from 'react-redux';
import { Formik } from 'formik';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Alert from '@material-ui/lab/Alert';
import { mount } from 'enzyme';
// import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../../redux/store';
import Return, { countryToFlag, disabledHandler } from '../../../components/trips/Return';
// import Trips, { handleTabsChange } from '../../../components/trips/trips';
// import Return from '../../../components/trips/Return';

describe('Test return trip', () => {
    let component;
    beforeEach(() => {
        const store = configureStore();
        component = mount(
            <Provider store={store}>
                <Return />
            </Provider>
        );
    });
    it('Should dispatch values', () => {
        const form = component.find(Formik);
        const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
        form.props().onSubmit(
            {
             origin: { id: 1, code: 'AD', country: 'Andorra' },
             destination: { id: 2, code: 'AE', country: 'United Arab Emirates' },
             accommodation: '',
             travelReasons: 'Visiting Friends',
             departureDate: new Date(),
             returnDate: new Date()
            }
        );
        expect(onSubmitSpy).toBeCalled();
    });
    it('Should dispatch values with accommodation', () => {
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		form.props().onSubmit({
            origin: { id: 1, code: 'AD', country: 'Andorra' },
            destination: { id: 2, code: 'AE', country: 'United Arab Emirates' },
            accommodation: 'Egypt',
            travelReasons: 'Visiting Friends',
            departureDate: new Date(),
            returnDate: new Date()
           });
		expect(onSubmitSpy).toBeCalled();
	});
    it('Should display country flags', () => {
        const flag = countryToFlag('RW');
        expect(flag).toEqual('🇷🇼');
    });
    it('Should disable button or enable it', () => {
        const isDisabled = disabledHandler(
            {
                values: { origin: 'Uganda', destination: 'Kenya', travelReasons: 'Visiting' }
            },
            { loading: false }
        );
        expect(isDisabled).toEqual(true);
    });
});

describe('Test message returned on success', () => {
    it('should validate trip inputs', () => {
        const store = mockConfigureStore([thunk])({
            returnTripReducer: {
                loading: false,
                messages: 'Trip created successfully',
                locations: []
            }
        });
        const component = mount(
            <Provider store={store}>
                <Return />
            </Provider>
        );
        expect(component.find(Alert).text()).toEqual('*Trip created successfully');
    });
})
