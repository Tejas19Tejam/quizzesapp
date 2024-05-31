import { ThemeProvider } from "styled-components";

const sizes = {
  mobile: "34em", // Below 544px (Phones)
  tabletS: "44em", // Below 704px (Smaller Tablets)
  tablet: "59em", // Below 944px (Tablets)
  tabletLandscape: "75em", // Below 1200px (Landscape Tablets)
  laptop: "84em", // Below 1344px (Smaller Desktops)
};

const theme = {
  // fontSizes: {
  //   xs: css`
  //     font-size: 1rem;
  //     line-height: 1rem;
  //   `,
  //   sm: css`
  //     font-size: 1.4rem;
  //     line-height: 1.25rem;
  //   `,
  //   base: css`
  //     font-size: 1.6rem;
  //     line-height: 1.5rem;
  //   `,
  //   "base-2x": css`
  //     font-size: 2.4rem;
  //     line-height: 2.5rem;
  //   `,
  //   "base-3x": css`
  //     font-size: 3.2rem;
  //     line-height: 1rem;
  //   `,
  //   lg: css`
  //     font-size: 3.6rem;
  //     line-height: 1rem;
  //   `,
  //   "lg-2x": css`
  //     font-size: 5.2rem;
  //     line-height: 1rem;
  //   `,
  //   "lg-3x": css`
  //     font-size: 6.2rem;
  //     line-height: 1rem;
  //   `,
  //   xl: css`
  //     font-size: 7.4rem;
  //     line-height: 1rem;
  //   `,
  //   "xl-2x": css`
  //     font-size: 9.8rem;
  //     line-height: 1rem;
  //   `,
  //   "xl-3x": css`
  //     font-size: 11rem;
  //     line-height: 1;
  //   `,
  // },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  screens: {
    mobile: `(max-width: ${sizes.mobile})`,
    tabletS: `(max-width: ${sizes.tabletS})`,
    tablet: `(max-width: ${sizes.tablet})`,
    tabletLandscape: `(max-width: ${sizes.tabletLandscape})`,
    laptop: `(max-width: ${sizes.laptop})`,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
