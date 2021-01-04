import React from 'react'
import styled from 'styled-components'

import { Logo } from 'components/common/Logo'
import { InnerContainer } from 'components/pureStyledComponents/InnerContainer'

const Wrapper = styled.header`
  &.siteHeader {
    align-items: center;
    background-color: ${(props) => props.theme.header.backgroundColor};
    display: flex;
    flex-shrink: 0;
    height: ${(props) => props.theme.header.height};
    justify-content: space-between;
    position: relative;
    z-index: 100;
  }
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

export const Header: React.FC = (props) => {
  return (
    <Wrapper className="siteHeader" {...props}>
      <InnerContainer>
        <LogoLink className="logoLink" href="/">
          <Logo />
        </LogoLink>
      </InnerContainer>
    </Wrapper>
  )
}
