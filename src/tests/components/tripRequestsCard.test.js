/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TripInfoCard from '../../components/requests/tripRequestsCard';

describe('Test On ProfilePicture Component', () => {
    const wrapper = shallow(<TripInfoCard />);
    const component = wrapper.dive();

    describe('render()', () => {
        test('Should Render ProfilePicture Component', () => {
            expect(toJson(component)).toMatchSnapshot();
        });
    });
});