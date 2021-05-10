import React from 'react';
import { render } from '@testing-library/react-native';

import Home from '../../screens/Home';

jest.mock("react-native-iphone-x-helper", () => {
  return {
    getStatusBarHeight: jest.fn(),
  };
});

describe('Home Page', () => {
  it('should contains search input', () => {
    const { getByPlaceholderText } = render(<Home/>);

    expect(getByPlaceholderText('Encontre um restaurante')).toBeTruthy();
  });
});