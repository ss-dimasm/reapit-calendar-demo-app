import React from 'react';

import { render, shallow } from 'enzyme';

import PropertyImages from '../propertyImages';

describe('Property Images', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<PropertyImages />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render static HTML', () => {
    const wrapper = render(<PropertyImages />);
    expect(wrapper.text()).toEqual('No images is available');
  });
});
