/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

import React from 'react';
import { Provider } from 'react-redux';
import { Formik } from 'formik';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Alert from '@material-ui/lab/Alert';
import { mount } from 'enzyme';
import OneWay, { countryToFlag, disabledHandler } from '../../../components/trips/Oneway';

describe('Test one way trip', () => {
    let component;
    beforeEach(() => {
        const store = mockConfigureStore([thunk])({
            oneWayTripReducer:{
                locations:[]
            }
        });
        component = mount(
            <Provider store={store}>
                <OneWay />
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
             travelReasons: 'Visiting Friends',
             departureDate: new Date()
            }
        );
        expect(onSubmitSpy).toBeCalled();
    });
    it('Should display country flags', () => {
        const flag = countryToFlag('RW');
        expect(flag).toEqual('🇷🇼');
    });
    it('Should disable button or enable it', () => {
        const isDiasabled = disabledHandler(
            {
                values: { origin: 'Uganda', destination: 'Kenya', travelReasons: 'Visiting' }
            },
            { loading: false }
        );
        expect(isDiasabled).toEqual(true);
    });
});

describe('Test on inputs validations', () => {
    it('should validate trip inputs', () => {
        const store = mockConfigureStore([thunk])({
            oneWayTripReducer:{
                locations:[],
                messages:'Trip request is successfully created'
            }
        });
        const component = mount(
            <Provider store={store}>
                <OneWay />
            </Provider>
        );
        expect(component.find(Alert).text()).toEqual('*Trip request is successfully created');
    });
})
