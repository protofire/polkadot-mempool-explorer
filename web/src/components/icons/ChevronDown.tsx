import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    stroke: ${(props) => props.theme.colors.mediumGrey};
  }
`

export const ChevronDown: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`chevronDown ${props.className}`}
    height="6.342"
    viewBox="0 0 10.047 6.342"
    width="10.047"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fill"
      d="M0 .578L.553 0l4.375 4.311L.553 8.623 0 8.045l3.788-3.734z"
      transform="rotate(90 4.317 5.019)"
    />
  </Wrapper>
)
