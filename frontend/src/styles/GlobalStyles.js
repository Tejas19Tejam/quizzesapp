import { createGlobalStyle } from "styled-components";
import { media } from "../utils/media";

// - Font Size System (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

// - Spacing System (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

const GlobalStyles = createGlobalStyle`
:root {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;


  --color-orange-700: #FF5D01;


  --color-green-600: #60B84B;
  --color-green-700: #4d7c0f;
  --color-green-800: #166534;


  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;


  --color-purple-700: #5076FF;
  --color-purple-500: #a9bcff;
  --color-purple-900: #0b0a35;

  





  --backdrop-color: rgba(26, 25, 25, 0.91);

  --shadow-sm: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-md: 0 0.3rem 0.9rem rgba(0, 0, 0, 0.1);
  
  --shadow-lg: 0 1px 9px rgba(0, 0, 0, 0.2);


  

  --image-grayscale: 0;
  --image-opacity: 100%;
  
  
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  ;
  
  --border-radius-tiny: 5px;
  --border-radius-sm:8px;
  --border-radius-md: 10px;
  --border-radius-lg: 12px;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-grey-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}


.custom-scrollbar {
  overflow-x: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: var(--color-grey-200) /* Optional for color */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 0.8rem; /* Track width */
  height: 0.8rem; /* Optional for vertical scrollbar */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--color-grey-50); /* Track color */
  border-radius: 0.8rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5); /* Thumb color */
  border-radius: 0.4rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7); /* Thumb hover color */
}


${media.laptop`
    
    html{
        font-size:55.5%
    }

  `}

  ${media.tabletLandscape`
    html{
        font-size:52.5%
    }
    
  `}

  ${media.tablet`
    html{
        font-size:47.5%
    }
  `}

  ${media.tabletS`
    html{
        font-size:34.5%
    }
  `}

  ${media.mobile`
    html{
        font-size:29.5%
    }
  `}

`;

export default GlobalStyles;
