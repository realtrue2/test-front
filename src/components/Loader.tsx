import { keyframes, styled } from 'styled-components'

export default function Loader() {
  return (
    <Root>
      <span />
      <span />
      <span />
    </Root>
  )
}

const anim = keyframes`
  0% {
    opacity: .4;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: .4;
    transform: scale(1, 1);
  }
`

const Root = styled.div`
  position: relative;
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    animation: ${anim} 1.5s infinite ease-in-out;
    background: #000;
    border-radius: 10px;
    height: 10px;
    width: 10px;

    &:nth-child(2) {
      animation-delay: 0.5s;
    }

    &:nth-child(3) {
      animation-delay: 1s;
    }
  }
`
