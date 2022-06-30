import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const fadeInEffect = keyframes`
    0% {
      transform: translate(0, 30px);
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  `

export const FadeIn = ({ duration, delay, children }) => {
  return (
    <FadeInWrapper duration={duration} delay={delay}>
      {children}
    </FadeInWrapper>
  )
}

const FadeInWrapper = styled.div`
  animation: ${fadeInEffect} ${(props) => props.duration}ms 1;
  animation-delay: ${(props) => props.delay}ms;
`
