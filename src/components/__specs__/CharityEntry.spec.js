import React, { View, Text, StyleSheet,Image } from 'react-native';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import  CharityEntry   from '../Charity/CharityEntry.js';
import { expect } from 'chai';

describe('<ChariyEntry />', () => {
  var entry = {'month': 'march', 'year': '2016', 'name': 'arsenal', 'imageSource': 'chakka' };
  
  it('should render 5 view components', () => {
    const wrapper = shallow(<CharityEntry entry={entry}/>);
    expect(wrapper.find(View)).to.have.length(5);
  });

  it('should render 5 text components', () => {
    const wrapper = shallow(<CharityEntry entry={entry}/>);
    expect(wrapper.find(Text)).to.have.length(5);
  });

  it('should render a text element with month passed as content', () => {
    const wrapper = shallow(<CharityEntry entry={entry}/>);
    let month_component = wrapper.findWhere((component) => {
      return component.props().children === "march";
    });
    expect(month_component.length).to.equal(1);
  });

  it('should render a text element with year passed as content', () => {
    const wrapper = shallow(<CharityEntry entry={entry}/>);
    let month_component = wrapper.findWhere((component) => {
      return component.props().children === "2016";
    });
    expect(month_component.length).to.equal(1);
  });

  it('should render a text element with name passed as content', () => {
    const wrapper = shallow(<CharityEntry entry={entry}/>);
    let month_component = wrapper.findWhere((component) => {
      return component.props().children === "arsenal";
    });
    expect(month_component.length).to.equal(1);
  });

  it('should render a Image component with correct src attribute', () => {
    const wrapper = shallow(<CharityEntry entry={entry}/>);
    expect(wrapper.find(Image)).to.have.length(1);
    expect(wrapper.find(Image).first().props().source.uri).to.equal("chakka");
  });

});
