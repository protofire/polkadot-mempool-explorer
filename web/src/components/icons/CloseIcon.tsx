import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: ${(props) => props.theme.colors.mediumGrey};
  }
`

export const CloseIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`closeIcon ${props.className}`}
    height="14"
    viewBox="0 0 14 14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h14v14H0z" fill="none" fillRule="evenodd" />
    <path
      className="fill"
      d="M8.657 7.832l4.836 4.836a.583.583 0 0 1-.825.825L7.832 8.657l-4.837 4.836a.583.583 0 0 1-.825-.825l4.836-4.836-4.837-4.837a.584.584 0 0 1 .825-.825l4.838 4.836 4.836-4.837a.584.584 0 0 1 .825.825L8.657 7.832z"
      fillRule="evenodd"
      transform="translate(-.833 -.833)"
    />
  </Wrapper>
)
