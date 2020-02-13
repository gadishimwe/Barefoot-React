/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../routes';
import configureStore from '../redux/store';

describe('app component', () => {
	test('it should render the Home component', () => {
		const component = mount(
			<Provider store={configureStore()}>
				<MemoryRouter initialEntries={['/']}>
					<Routes />
				</MemoryRouter>
			</Provider>,
		);
		expect(component.find(Routes)).toHaveLength(1);
	});
});
