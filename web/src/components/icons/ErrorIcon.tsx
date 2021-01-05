import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: #f02525;
  }
`

export const ErrorIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`errorIcon ${props.className}`}
    height="14"
    id="error"
    viewBox="0 0 14 14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h14v14H0z" fill="none" fillRule="evenodd" />
    <rect
      className="fill"
      height="4.667"
      rx=".583"
      transform="translate(6.417 3.5)"
      width="1.167"
    />
    <path
      className="fill"
      d="M11.479 15.75a.729.729 0 1 1-.729.729.729.729 0 0 1 .729-.729z"
      transform="translate(-4.479 -6.563)"
    />
    <path
      className="fill"
      d="M7.833 13.667A5.833 5.833 0 1 0 2 7.833a5.833 5.833 0 0 0 5.833 5.834zm0-1.167A4.667 4.667 0 1 1 12.5 7.833 4.667 4.667 0 0 1 7.833 12.5z"
      transform="translate(-.833 -.833)"
    />
  </Wrapper>
)
