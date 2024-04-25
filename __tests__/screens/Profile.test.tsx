import React from 'react';
import Profile from '../../src/navigation/screens/Account';
import {render} from '@testing-library/react-native';

test('should show profile links', () => {
  const {getByText} = render(<Profile />);

  const label = getByText('Victor Aguilar');
  expect(label).toBeTruthy();
});
