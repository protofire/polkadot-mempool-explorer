import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: ${(props) => props.theme.colors.primary};
  }
`

export const SuccessIcon: React.FC = (props) => {
  const { ...restProps } = props

  return (
    <Wrapper
      height="52"
      viewBox="0 0 24 24"
      width="52"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0H24V24H0z" />
        <path
          className="fill"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
          fillRule="nonzero"
        />
        <path
          className="fill"
          d="M7.681 10.276c-.403-.378-1.036-.357-1.413.047-.377.403-.356 1.036.047 1.413l4.14 3.876c.398.372 1.02.358 1.4-.032l5.347-5.484c.386-.395.378-1.029-.018-1.414-.395-.386-1.028-.378-1.414.018l-4.663 4.782-3.426-3.206z"
          fillRule="nonzero"
        />
      </g>
    </Wrapper>
  )
}
