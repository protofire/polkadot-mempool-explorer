import React from 'react'
import styled, { css } from 'styled-components'

import { Protofire } from 'components/icons/Protofire'
import { InnerContainer } from 'components/pureStyledComponents/InnerContainer'

const Wrapper = styled.footer`
  align-items: initial;
  border-radius: 0;
  display: block;
  height: auto;
  margin-top: auto;
  overflow: visible;
  padding: 45px 0 25px;
  width: 100%;
`

const Items = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  margin: 0;

  @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
    flex-direction: row;
  }
`

const TextCSS = css`
  color: ${(props) => props.theme.colors.mediumGrey};
  font-size: 12px;
  line-height: 1.2;
  text-decoration: none;
`

const Text = styled.span`
  ${TextCSS}
`

const Item = styled.li`
  ${TextCSS}
  align-items: center;
  display: flex;

  &:last-child {
    .break {
      display: none;
    }
  }
`

const ExternalLink = styled.a`
  ${TextCSS}

  &:hover {
    text-decoration: underline;
  }
`

const ExternalLinkFlex = styled(ExternalLink)`
  align-items: center;
  display: flex;
`

const Break = styled.span`
  display: none;
  margin: 0 6px;

  @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
    display: block;
  }

  &:after {
    content: '-';
  }
`

const Logo = styled(Protofire)`
  margin-left: 6px;
`

export const Footer: React.FC = (props) => {
  const { ...restProps } = props
  const date = new Date()
  const year = date.getFullYear()

  return (
    <Wrapper className="siteFooter" {...restProps}>
      <InnerContainer>
        <Items className="footerItems">
          <Item>
            <Text>{`Polkadot Mempool Explorer ${year}`}</Text>
            <Break className="break" />
          </Item>
          <Item>
            <ExternalLinkFlex
              href="https://protofire.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Built by
              <Logo />
            </ExternalLinkFlex>
            <Break className="break" />
          </Item>
          <Item>
            <ExternalLink
              href="https://github.com/protofire/polkadot-mempool-explorer"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </ExternalLink>
          </Item>
        </Items>
      </InnerContainer>
    </Wrapper>
  )
}
