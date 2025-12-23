import { createGlobalStyle } from 'styled-components'

const styledGlobal = { createGlobalStyle }

const GlobalStyle = styledGlobal.createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body,
  html,
  #root {
    scroll-behavior: smooth;
    height: 100%;
    overflow-anchor: none;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    font-weight: 500;
  }

  button {
    border: 0;
    background: none;
    padding: 0;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  input {
    background: none;
    outline: none;
  }

  textarea {
    outline: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  ul,
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }
`

export default GlobalStyle
