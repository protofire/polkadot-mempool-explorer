import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg``

export const AllTransactions: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`allTransactions ${props.className}`}
    height="9"
    viewBox="0 0 10 9"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="rotate(90 220 -64)">
      <rect fill="#767676" height="10" rx="2" transform="translate(289 146)" width="4" />
      <rect fill="#e6007a" height="10" rx="2" transform="translate(284 146)" width="4" />
    </g>
  </Wrapper>
)
