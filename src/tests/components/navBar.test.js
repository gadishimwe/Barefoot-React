/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavBar from '../../components/common/NavBar';

describe('Test On NavBar Component', () => {
    const wrapper = mount(<NavBar />);

    describe('render()', () => {
        test('Should Render NavBar Component', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
