import { css } from "styled-components";

export const media = {
  mobile: (...args) => css`
    @media ${(props) => props.theme.screens.mobile} {
      ${css(...args)}
    }
  `,
  tabletS: (...args) => css`
    @media ${(props) => props.theme.screens.tabletS} {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media ${(props) => props.theme.screens.tablet} {
      ${css(...args)}
    }
  `,
  tabletLandscape: (...args) => css`
    @media ${(props) => props.theme.screens.tabletLandscape} {
      ${css(...args)}
    }
  `,
  laptop: (...args) => css`
    @media ${(props) => props.theme.screens.laptop} {
      ${css(...args)}
    }
  `,
};
