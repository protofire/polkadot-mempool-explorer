import React from 'react'
import styled from 'styled-components'

import { GithubIcon } from 'components/icons/GithubIcon'

const Wrapper = styled.a`
  align-items: center;
  border-bottom: 3px solid transparent;
  color: #fff;
  display: flex;
  height: 100%;
  margin-right: 12px;
  text-decoration: none;
  transition: all 0.15s linear;

  &:hover {
    border-bottom-color: #fff;
  }
`

const Link = styled.span`
  align-items: center;
  border-right: 1px solid #fff;
  display: flex;
  height: 20px;
  padding-right: 12px;
`

const Text = styled.span`
  font-size: 14px;
  line-height: 1.2;
  margin-left: 6px;
`

export const GithubButton: React.FC = (props) => {
  const { ...restProps } = props

  return (
    <Wrapper
      {...restProps}
      href="https://github.com/protofire/polkadot-mempool-explorer"
      target="_blank"
    >
      <Link>
        <GithubIcon />
        <Text>Github</Text>
      </Link>
    </Wrapper>
  )
}
