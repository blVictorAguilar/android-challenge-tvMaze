module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\\\\\\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
};
