import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import  CountDown   from '../counter.js';
import { expect } from 'chai';

describe('<CountDown />', () => {
  var time = 15;
  
  it('should render 1 text components', () => {
    const wrapper = shallow(<CountDown time={time}/>);
    expect(wrapper.find(Text)).to.have.length(1);
  });

  it('should render time which is in its state', () => {
    const wrapper = shallow(<CountDown time={time} />);
    wrapper.setState({ time: 19 });
    expect(wrapper.find(Text).first().props().children).to.equal(19);
  });

  it('should have an initial time of passed time in props', () => {
    const wrapper = shallow(<CountDown time={7} />);
    expect(wrapper.state('time')).to.equal(7);
  });

});
