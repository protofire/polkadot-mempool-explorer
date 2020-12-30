import React from 'react'
import styled, { css } from 'styled-components'

// eslint-disable-next-line no-restricted-imports
import { version as appVersion } from '../../../../package.json'

const Wrapper = styled.footer`
  &.siteFooter {
    align-items: initial;
    border-radius: 0;
    display: block;
    height: auto;
    margin-top: auto;
    overflow: visible;
    padding: 25px 0;
    width: 100%;
  }
`

const Items = styled.ul`
  &.footerItems {
    align-items: center;
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding-bottom: 0;
    padding-left: ${(props) => props.theme.layout.horizontalPadding};
    padding-right: ${(props) => props.theme.layout.horizontalPadding};
    padding-top: 0;

    @media (min-width: ${(props) => props.theme.themeBreakPoints.mdPre}) {
      flex-direction: row;
      justify-content: center;
    }
  }
`

const Item = styled.li`
  color: ${(props) => props.theme.colors.textColor};

  &:last-child {
    .break {
      display: none;
    }
  }
`

const LinkCSS = css`
  color: ${(props) => props.theme.colors.textColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const ExternalLink = styled.a`
  ${LinkCSS}
`

const Break = styled.span`
  @media (min-width: ${(props) => props.theme.themeBreakPoints.mdPre}) {
    margin: 0 6px;

    &:after {
      content: '|';
    }
  }
`

export const Footer: React.FC = (props) => {
  const { ...restProps } = props
  const date = new Date()
  const year = date.getFullYear()
  const version = appVersion || 'Invalid Version Number'

  return (
    <Wrapper className="siteFooter" {...restProps}>
      <Items className="footerItems">
        <Item>
          <ExternalLink href="https://gnosis.io/" rel="noopener noreferrer" target="_blank">
            {`©${year} Gnosis`}
          </ExternalLink>
          <Break className="break" />
        </Item>
        <Item>
          <ExternalLink href="/terms-and-conditions#mainTitle">Terms &amp; Conditions</ExternalLink>
          <Break className="break" />
        </Item>
        <Item>
          <ExternalLink href="/privacy-policy#mainTitle">Privacy Policy</ExternalLink>
          <Break className="break" />
        </Item>
        <Item>
          <ExternalLink href="/cookie-policy#mainTitle">Cookie Policy</ExternalLink>
          <Break className="break" />
        </Item>
        <Item>
          <ExternalLink
            href="https://docs.gnosis.io/conditionaltokens/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </ExternalLink>
          <Break className="break" />
        </Item>
        <Item>
          <ExternalLink
            href="https://github.com/gnosis/conditional-tokens-explorer/"
            rel="noopener noreferrer"
            target="_blank"
          >{`v${version}`}</ExternalLink>
        </Item>
      </Items>
    </Wrapper>
  )
}
