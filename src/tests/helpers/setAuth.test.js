/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// import React from 'react';
// import { Provider } from 'react-redux';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { BrowserRouter as Router } from 'react-router-dom';
// import mockConfigureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import Helpers from '../../helpers/setAuth.helper';

describe('Test set auth', () => {
    it('Should set auth', () => {
        Helpers.setUSer({email:'email'})
    });
    it('Should set auth', () => {
    const localStorageMock = (() => {
        let store = {};
        return {
            getItem(key) {
                return store[key] || null;
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            removeItem(key) {
                delete store[key];
            },
            clear() {
                store = {};
            }
        };
    })();
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
    });
    const user = {email:'email'}
    localStorageMock.setItem('user', user);
    Helpers.setUSer(user)
    });
});
