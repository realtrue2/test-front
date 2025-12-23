import styled from 'styled-components'

export default {
  breakpoints: {
    sm: '@media screen and (max-width: 920px)',
  },
}

export const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
    padding: 0 30px;
  }
`
