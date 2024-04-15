import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../src/navigation/screens/Account';

test('renders correctly', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});
