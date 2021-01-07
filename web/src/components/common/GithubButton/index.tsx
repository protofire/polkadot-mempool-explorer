import React from 'react'
import styled from 'styled-components'

import { GithubIcon } from 'components/icons/GithubIcon'

const Wrapper = styled.a`
  align-items: center;
  border-bottom: 3px solid transparent;
  color: #fff;
  display: none;
  height: 100%;
  text-decoration: none;
  transition: all 0.15s linear;

  &:hover {
    border-bottom-color: #fff;
  }

  @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
    display: flex;
  }
`

const Link = styled.span`
  align-items: center;
  display: flex;
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
