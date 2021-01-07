import React, { AnchorHTMLAttributes } from 'react'
import styled from 'styled-components'

import { ExternalLinkIcon } from 'components/icons/ExternalLinkIcon'

const Wrapper = styled.a`
  align-items: center;
  background: #f0f1f2;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: 22px;
  flex-shrink: 0;
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
`

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export const ButtonExternalLink: React.FC<Props> = (props) => {
  const { href, ...restProps } = props

  return (
    <Wrapper className="buttonExternalLink" href={href} target="_blank" {...restProps}>
      <ExternalLinkIcon />
    </Wrapper>
  )
}
