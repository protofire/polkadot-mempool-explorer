import React from 'react'
import styled from 'styled-components'

import { NetworkIcon } from 'components/icons/NetworkIcon'

const Wrapper = styled.div`
  align-items: center;
  border-bottom: 3px solid transparent;
  color: #fff;
  display: flex;
  height: 100%;
  text-decoration: none;
  transition: all 0.15s linear;

  &:hover {
    border-bottom-color: #fff;
  }
`

const Link = styled.span`
  align-items: center;
  display: flex;
  height: 20px;
`

const Text = styled.span`
  font-size: 14px;
  line-height: 1.2;
  margin-left: 6px;
`

export const NodeButton: React.FC = (props) => {
  const { ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <Link>
        <NetworkIcon />
        <Text>Main Node</Text>
      </Link>
    </Wrapper>
  )
}
