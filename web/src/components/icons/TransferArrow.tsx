import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: none;
    stroke: #e6007a;
  }
`

export const TransferArrow: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`transferArrow ${props.className}`}
    height="19.452"
    viewBox="0 0 27.721 19.452"
    width="27.721"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="translate(-653.43 -249.5)">
      <path
        className="fill"
        d="M15.532 0l7.7 9.226-7.7 9.226H8.139l7.717-9.226L8.139 0z"
        transform="translate(657.264 250)"
      />
      <path
        className="fill"
        d="M15.532 0l7.7 9.226-7.7 9.226H8.139l7.717-9.226L8.139 0z"
        transform="translate(646.361 250)"
      />
    </g>
  </Wrapper>
)
