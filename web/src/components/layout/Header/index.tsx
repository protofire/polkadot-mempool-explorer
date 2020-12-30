import React from 'react'
import styled from 'styled-components'

import { Logo } from 'components/common/Logo'

const Wrapper = styled.header`
  &.siteHeader {
    align-items: center;
    background-color: ${(props) => props.theme.header.backgroundColor};
    border-bottom: solid 1px #e8e7e6;
    display: flex;
    flex-shrink: 0;
    height: ${(props) => props.theme.header.height};
    justify-content: space-between;
    padding-left: ${(props) => props.theme.layout.horizontalPadding};
    padding-right: ${(props) => props.theme.layout.horizontalPadding};
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
      <LogoLink className="logoLink" href="/">
        <Logo />
      </LogoLink>
    </Wrapper>
  )
}
