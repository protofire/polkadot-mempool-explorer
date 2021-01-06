import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;

  .fill {
    fill: #fff;
  }
`

export const GithubIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`githubIcon ${props.className}`}
    height="12"
    viewBox="0 0 12.304 12"
    width="12.304"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fill"
      d="M142.471 107.44a6.153 6.153 0 0 0-1.944 11.989c.308.056.42-.133.42-.3 0-.146-.005-.533-.008-1.046-1.711.372-2.072-.824-2.072-.824a1.629 1.629 0 0 0-.683-.9c-.559-.382.042-.374.042-.374a1.292 1.292 0 0 1 .942.634 1.31 1.31 0 0 0 1.79.511 1.315 1.315 0 0 1 .39-.823c-1.366-.155-2.8-.683-2.8-3.041a2.378 2.378 0 0 1 .633-1.651 2.21 2.21 0 0 1 .06-1.628s.516-.165 1.692.631a5.834 5.834 0 0 1 3.08 0c1.175-.8 1.69-.631 1.69-.631a2.211 2.211 0 0 1 .062 1.628 2.374 2.374 0 0 1 .632 1.651c0 2.363-1.439 2.883-2.809 3.036a1.469 1.469 0 0 1 .418 1.139c0 .823-.008 1.486-.008 1.688 0 .164.111.356.423.3a6.153 6.153 0 0 0-1.949-11.989z"
      fillRule="evenodd"
      transform="translate(-136.32 -107.44)"
    />
  </Wrapper>
)
