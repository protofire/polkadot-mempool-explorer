import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: #34b424;
  }
`

export const CheckIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`checkIcon ${props.className}`}
    height="14"
    viewBox="0 0 14 14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h14v14H0z" fill="none" fillRule="evenodd" />
    <path
      className="fill"
      d="M6.083 13.167A.581.581 0 0 1 5.67 13l-3.5-3.5A.583.583 0 0 1 3 8.669l3.087 3.089 6.583-6.587a.583.583 0 0 1 .824.829l-7 7a.581.581 0 0 1-.412.171"
      fillRule="evenodd"
      transform="translate(-.833 -2.083)"
    />
  </Wrapper>
)
