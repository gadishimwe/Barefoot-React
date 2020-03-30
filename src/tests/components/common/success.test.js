/* eslint-disable no-undef */
import React from 'react';
import Success from '../../../components/Success';

describe('Test Chat', () => {
	it('Should render Chat view', () => {
		const component = mount(<Success />);
		expect(component.length).toEqual(1);
	});
});
