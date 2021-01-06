import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;

  .fill {
    fill-rule: evenodd;
    fill: ${(props) => props.theme.colors.darkGrey};
  }
`

export const RemoveIcon: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`removeIcon ${props.className}`}
    height="12"
    viewBox="0 0 12 12"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h12v12H0z" fill="none" fillRule="evenodd" />
    <path
      className="fill"
      d="M9.5 14.01a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 0 .5.5m2 0a.5.5 0 0 0 .5-.5v-3a.5.5 0 1 0-1 0v3a.5.5 0 0 0 .5.5"
      transform="translate(-4.5 -5.005)"
    />
    <path
      className="fill"
      d="M9.757 10.775a.252.252 0 0 1-.249.225H5.484a.256.256 0 0 1-.237-.229L4.924 5h5.143l-.311 5.775zM6.5 3.309A.312.312 0 0 1 6.807 3h1.384a.309.309 0 0 1 .308.308V4h-2v-.692zm5 .691h-2v-.692A1.308 1.308 0 0 0 8.192 2H6.808A1.31 1.31 0 0 0 5.5 3.308V4h-2a.5.5 0 1 0 0 1h.423l.326 5.824A1.24 1.24 0 0 0 5.469 12h4.055a1.242 1.242 0 0 0 1.231-1.174L11.068 5h.432a.5.5 0 1 0 0-1z"
      id="Path_9"
      transform="translate(-1.5 -1)"
    />
  </Wrapper>
)
