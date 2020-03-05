/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ApprovalCard from '../../components/requests/approvalsCard';

describe('Test On Approval Card Component', () => {
    const wrapper = mount(<ApprovalCard />);

    describe('render()', () => {
        test('Should Render Approval Card Component', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
