import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: ${(props) => props.theme.colors.mediumGrey};
  }
`

export const IconSubmit: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`iconSubmit ${props.className}`}
    height="13.241"
    viewBox="0 0 7.724 13.241"
    width="7.724"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fill"
      d="M7.4 5.838l-.066-.06L1.883.323a1.103 1.103 0 00-1.56 1.56L5.06 6.622.322 11.359a1.103 1.103 0 001.56 1.56l5.466-5.463.052-.055a1.119 1.119 0 000-1.567"
      fillRule="evenodd"
    />
  </Wrapper>
)
