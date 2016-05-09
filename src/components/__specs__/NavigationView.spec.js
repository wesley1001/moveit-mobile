import React, { View, Text, StyleSheet,Image, TouchableHighlight } from 'react-native';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import  NavigationView   from '../NavigationView.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('<NavigationView />', () => {
  
  it('should render 2 view components', () => {
    const wrapper = shallow(<NavigationView />);
    expect(wrapper.find(View)).to.have.length(2);
  });

  it('should have correct initial state', () => {
    const wrapper = shallow(<NavigationView />);
    expect(wrapper.state('user').gravatar).to.equal('');
  });

  it('should call onSelect method if TouchableHighlight is pressed', () => {
    sinon.stub(NavigationView.prototype, "onSelect");
    const wrapper = shallow(<NavigationView />);
    let add_entry_option = wrapper.find(TouchableHighlight).first();
    add_entry_option.simulate('press');
    expect(NavigationView.prototype.onSelect.calledOnce).to.be.true;
    NavigationView.prototype.onSelect.restore();
  });
});
