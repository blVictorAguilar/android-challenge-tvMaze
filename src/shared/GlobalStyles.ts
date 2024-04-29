import colors from './Colors';

const fontCommons = {
  fontFamily: 'NetflixFont',
  color: colors.text,
};

export enum FontSizes {
  XS = 10,
  S = 12,
  M = 15,
  L = 22,
  XL = 26,
}
const globalStyles = {
  title: {
    fontSize: FontSizes.L,
    ...fontCommons,
  },
  subtitle: {
    fontSize: FontSizes.M,
    ...fontCommons,
  },
  paragraph: {
    fontSize: FontSizes.M,
    lineHeight: 24,
    ...fontCommons,
  },
  details: {
    fontSize: FontSizes.XS,
    lineHeight: 12,
    fontFamily: fontCommons.fontFamily,
    color: colors.secondary,
  },
  headerTitle: {
    fontSize: FontSizes.XL,
    ...fontCommons,
  },
  sectionTitle: {
    fontSize: 15,
    ...fontCommons,
  },
};

export default globalStyles;
