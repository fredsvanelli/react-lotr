import { createGlobalStyle } from 'styled-components'

import MainBg from 'assets/main-bg.jpg'

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    html, body, #root {
        min-height: 100vh;
    }

    body {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        color: white;
        font-size: 2rem;
        background-image: url(${MainBg});
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }

    a {
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    .text-center {
        text-align: center;
    }

    .d-none {
        display: none;
    }

    .mb-3 {
        margin-bottom: 3rem;
    }

    .ms-1 {
        margin-left: 1rem;
    }

    @media (min-width: 992px) {
        .d-lg-block {
            display: block;
        }

        .d-lg-none {
            display: none;
        }
    }
`
