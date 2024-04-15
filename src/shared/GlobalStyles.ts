import colors from './Colors';

const commons = {
  fontFamily: 'NetflixFont',
  color: colors.text,
};

export enum FontSizes {
  S = 11,
  M = 12,
  L = 22,
  XL = 26,
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
  headerTitle: {
    fontSize: FontSizes.XL,
    fontWeight: '600',
    ...commons,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '300',
    ...commons,
  },
};

export default globalStyles;
