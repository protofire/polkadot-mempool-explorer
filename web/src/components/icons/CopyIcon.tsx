import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;

  .fill {
    fill: #1e1e1e;
  }
`

export const CopyIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`copyIcon ${props.className}`}
    height="10"
    viewBox="0 0 8.006 10"
    width="8.006"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fill"
      d="M5.437,3.148H.791A.791.791,0,0,0,0,3.939v6.67a.791.791,0,0,0,.791.791H5.437a.791.791,0,0,0,.791-.791V3.939a.793.793,0,0,0-.791-.791Zm.238,7.458a.237.237,0,0,1-.238.238H.788a.237.237,0,0,1-.237-.238V3.94A.237.237,0,0,1,.788,3.7H5.437a.238.238,0,0,1,.238.238Z"
      transform="translate(0 -1.399)"
    />
    <path
      className="fill"
      d="M8.637,0H3.991A.791.791,0,0,0,3.2.791a.278.278,0,1,0,.556,0A.237.237,0,0,1,3.991.556H8.637a.238.238,0,0,1,.238.238V7.461a.237.237,0,0,1-.238.237.278.278,0,0,0,0,.556.791.791,0,0,0,.791-.791V.791A.791.791,0,0,0,8.637,0Z"
      transform="translate(-1.422)"
    />
  </Wrapper>
)
