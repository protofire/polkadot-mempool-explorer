import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg``

export const InMempool: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`inMempool ${props.className}`}
    height="10"
    viewBox="0 0 10 10"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="#e6007a" height="10" rx="2" width="10" />
  </Wrapper>
)
