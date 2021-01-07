import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;

  .fill {
    fill: ${(props) => props.theme.colors.darkGrey};
  }
`

export const ExternalLinkIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`externalLinkIcon ${props.className}`}
    height="9"
    viewBox="0 0 9 9"
    width="9"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fill"
      d="M17.714-992.214h.643V-989H10v-8.357h3.214v.643h-2.571v7.071h7.071zM14.5-998H19v4.5h-.643v-3.375l-5.3 5.3-.482-.482 5.3-5.3H14.5z"
      transform="translate(-10 998)"
    />
  </Wrapper>
)
