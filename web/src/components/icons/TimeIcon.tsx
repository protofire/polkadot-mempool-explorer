import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg``

export const TimeIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`timeIcon ${props.className}`}
    height="10"
    viewBox="0 0 10 10"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 0a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5zm0 8.788A3.788 3.788 0 1 1 8.788 5 3.792 3.792 0 0 1 5 8.788zm.748-6.373v3.011a.606.606 0 0 1-.606.606H3.04a.606.606 0 1 1 0-1.212h1.5V2.415a.606.606 0 0 1 1.212 0z"
      fill="#999"
    />
  </Wrapper>
)
