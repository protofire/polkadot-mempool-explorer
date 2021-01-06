import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;

  .fill {
    fill: #fff;
  }
`

export const NetworkIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`networkIcon ${props.className}`}
    height="12"
    viewBox="0 0 12 12"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fill"
      d="M6 0a6 6 0 1 0 6 6 5.992 5.992 0 0 0-6-6zm4.978 5.49H9.256A8.49 8.49 0 0 0 8.185 1.5a5.011 5.011 0 0 1 2.793 3.99zm-5.49-4.348v4.346H3.739c.107-2.234.904-3.864 1.749-4.346zm0 5.368v4.344c-.845-.488-1.641-2.127-1.749-4.344zm1.022 4.348V6.51h1.749c-.105 2.236-.902 3.866-1.749 4.348zm0-5.368V1.144c.845.488 1.641 2.127 1.749 4.344H6.51zM3.812 1.5a8.5 8.5 0 0 0-1.07 3.988h-1.72A5.021 5.021 0 0 1 3.812 1.5zm-2.79 5.01h1.722a8.461 8.461 0 0 0 1.071 3.99 5.006 5.006 0 0 1-2.793-3.99zm7.166 3.99a8.5 8.5 0 0 0 1.07-3.988h1.722A5.029 5.029 0 0 1 8.188 10.5z"
    />
  </Wrapper>
)
