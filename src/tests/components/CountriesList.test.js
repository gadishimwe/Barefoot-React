/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-duplicates */
import React from 'react';
import { mount } from 'enzyme';
import { countryToFlag } from '../../components/CountriesList';
import CountrySelect from '../../components/CountriesList';

describe('Render CountrySelector component', () => {
	it('should render CountrySelector component', () => {
		countryToFlag('AD');
		expect(countryToFlag(undefined)).toBe(undefined);
		const wrapper = mount(<CountrySelect countryChangeFn={jest.fn()} />);
		const country_select = wrapper.find('#country_select');
		country_select
			.first()
			.props()
			.onChange({});
		country_select
			.first()
			.props()
			.onChange({}, { label: 'Andorra' });
		country_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'jhhfhf'));
		country_select
			.first()
			.props()
			.renderOption(v => (v = { code: 'AD', label: 'Andorra', phone: '376' }));
	});
});
