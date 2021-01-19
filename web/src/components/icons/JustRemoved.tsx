import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg``

export const JustRemoved: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`justRemoved ${props.className}`}
    height="10"
    viewBox="0 0 10 10"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="#767676" height="10" rx="2" width="10" />
  </Wrapper>
)
