import React from 'react'
import styled from 'styled-components'

import { GithubButton } from 'components/common/GithubButton'
import { Logo } from 'components/common/Logo'
import { NodeButton } from 'components/common/NodeButton'
import { InnerContainer } from 'components/pureStyledComponents/InnerContainer'

const Wrapper = styled.header`
  align-items: center;
  background-color: ${(props) => props.theme.header.backgroundColor};
  display: flex;
  flex-shrink: 0;
  height: ${(props) => props.theme.header.height};
  justify-content: space-between;
  position: relative;
  z-index: 100;
`

const HeaderInnerContainer = styled(InnerContainer)`
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
  justify-content: space-between;
`

const LogoLink = styled.a`
  &.logoLink {
    left: 50%;
    position: absolute;
    text-decoration: none;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;

    @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
      left: auto;
      position: relative;
      top: auto;
      transform: none;
    }
  }
`

const EndElements = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`

const Break = styled.div`
  background-color: #fff;
  height: 20px;
  margin-left: 12px;
  margin-right: 12px;
  width: 1px;
`

export const Header: React.FC = (props) => {
  return (
    <Wrapper className="siteHeader" {...props}>
      <HeaderInnerContainer>
        <LogoLink className="logoLink" href="/">
          <Logo />
        </LogoLink>
        <EndElements>
          <GithubButton />
          <Break />
          <NodeButton />
        </EndElements>
      </HeaderInnerContainer>
    </Wrapper>
  )
}
