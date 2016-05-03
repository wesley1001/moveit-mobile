import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import  Test   from '../myComponent.js';
import { expect } from 'chai';

describe('<Test />', () => {
  it('it should render 1 view component', () => {
    const wrapper = shallow(<Test/>);
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it should render 2 text components', () => {
    const wrapper = shallow(<Test/>);
    expect(wrapper.find(Text)).to.have.length(2);
  });
});
