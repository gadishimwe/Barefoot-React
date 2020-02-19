/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../app';
import '../app.scss';
import configureStore from '../redux/store';

describe('app component', () => {
	test('it should render the Home component', () => {
		const component = mount(
			<Provider store={configureStore()}>
				<MemoryRouter initialEntries={['/']}>
					<App />
				</MemoryRouter>
			</Provider>
		);
		expect(component).toHaveLength(1);
	});
});
