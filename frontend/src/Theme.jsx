import { ThemeProvider } from "styled-components";

const sizes = {
  mobile: "34em", // Below 544px (Phones)
  tabletS: "44em", // Below 704px (Smaller Tablets)
  tablet: "59em", // Below 944px (Tablets)
  tabletLandscape: "75em", // Below 1200px (Landscape Tablets)
  laptop: "84em", // Below 1344px (Smaller Desktops)
};

const theme = {
  screens: {
    mobile: `(max-width: ${sizes.mobile})`,
    tabletS: `(max-width: ${sizes.tabletS})`,
    tablet: `(max-width: ${sizes.tablet})`,
    tabletLandscape: `(max-width: ${sizes.tabletLandscape})`,
    laptop: `(max-width: ${sizes.laptop})`,
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
