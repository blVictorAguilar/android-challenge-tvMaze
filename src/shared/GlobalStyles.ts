import colors from './Colors';

const commons = {
  fontFamily: 'NetflixFont',
  color: colors.text,
};

export enum FontSizes {
  S = 10,
  M = 12,
  L = 22,
}
const globalStyles = {
  title: {
    fontSize: FontSizes.L,
    fontWeight: '600',
    ...commons,
  },
  subtitle: {
    fontSize: FontSizes.M,
    fontWeight: '600',
    ...commons,
  },
  paragraph: {
    fontSize: FontSizes.M,
    lineHeight: 24,
    ...commons,
  },
  details: {
    fontSize: FontSizes.S,
    lineHeight: 12,
    fontFamily: commons.fontFamily,
    color: colors.secondary,
  },
};

export default globalStyles;
