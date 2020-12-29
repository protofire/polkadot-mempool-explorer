import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: #fff;
  }
`

export const IconPlus: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`iconPlus ${props.className}`}
    height="12"
    viewBox="0 0 12 12"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fill"
      d="M7.2 4.8h3.6a1.2 1.2 0 0 1 0 2.4H7.2v3.6a1.2 1.2 0 0 1-2.4 0V7.2H1.2a1.2 1.2 0 1 1 0-2.4h3.6V1.2a1.2 1.2 0 1 1 2.4 0z"
      fillRule="evenodd"
    />
  </Wrapper>
)
