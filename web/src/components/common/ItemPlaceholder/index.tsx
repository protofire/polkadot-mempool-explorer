import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg<{ opacity?: string }>`
  display: block;
  margin-bottom: 15px;
  width: 100%;
  opacity: ${(props) => (props.opacity ? props.opacity : '1')};

  .prefix__cls-2 {
    fill: #e9ecef;
  }
`

interface Props {
  opacity?: string
}

export const ItemPlaceholder: React.FC<Props> = (props) => {
  const { opacity, ...restProps } = props

  return (
    <Wrapper
      opacity={opacity}
      viewBox="0 0 1080 80"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect fill="#fff" height="80" id="prefix__bg" rx="4" width="1080" />
      <path className="prefix__cls-2" d="M4 0h4v80H4a4 4 0 01-4-4V4a4 4 0 014-4z" />
      <g id="prefix__Group_4" transform="translate(563.233 -196)">
        <rect
          className="prefix__cls-2"
          height="12"
          rx="6"
          transform="translate(161.767 247)"
          width="340"
        />
        <rect
          className="prefix__cls-2"
          height="12"
          rx="6"
          transform="translate(161.767 229)"
          width="340"
        />
      </g>
      <g id="prefix__Group_3" transform="translate(210 -196)">
        <rect
          className="prefix__cls-2"
          height="12"
          rx="6"
          transform="translate(162 247)"
          width="340"
        />
        <rect
          className="prefix__cls-2"
          height="12"
          rx="6"
          transform="translate(162 229)"
          width="340"
        />
      </g>
      <g id="prefix__Group_2" transform="translate(-143 -196)">
        <rect
          className="prefix__cls-2"
          height="12"
          rx="6"
          transform="translate(162 247)"
          width="340"
        />
        <rect
          className="prefix__cls-2"
          height="12"
          rx="6"
          transform="translate(162 229)"
          width="340"
        />
      </g>
      <rect
        className="prefix__cls-2"
        height="12"
        rx="6"
        transform="translate(19 15)"
        width="1046"
      />
    </Wrapper>
  )
}
