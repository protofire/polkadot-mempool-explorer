import React from 'react'
import styled from 'styled-components'

import { CopyIcon } from 'components/icons/CopyIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Wrapper = styled.button`
  align-items: center;
  background: #f0f1f2;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 22px;
  justify-content: center;
  margin: 0;
  outline: none;
  padding: 0;
  transition: all 0.1s linear;
  width: 22px;

  &:active {
    opacity: 0.7;
  }

  &:hover {
    background: ${(props) => props.theme.colors.primary};

    svg {
      .fill {
        fill: #fff;
      }
    }
  }

  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

interface Props {
  value: string
}

export const ButtonCopy: React.FC<Props> = (props) => {
  const { value, ...restProps } = props

  return (
    <CopyToClipboard text={value}>
      <Wrapper className="buttonCopy" {...restProps}>
        <CopyIcon />
      </Wrapper>
    </CopyToClipboard>
  )
}
