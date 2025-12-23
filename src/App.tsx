import styled, { ThemeProvider } from 'styled-components'
import theme from '@/theme'
import GlobalStyle from '@/theme/global'
import Main from '@/components/Main.tsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Main />
      </Wrapper>
    </ThemeProvider>
  )
}

export default App

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
