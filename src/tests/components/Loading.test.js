/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../../components/common/loading';

describe('Test On Loading Component', () => {
	const wrapper = shallow(<Loading />);
	describe('render()', () => {
		test('Should Render Loading Component', () => {
			expect(toJson(wrapper)).toMatchSnapshot();
		});
	});
});
