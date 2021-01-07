import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 15px;

  @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
    flex-direction: row;
  }
`

const Title = styled.h2`
  color: ${(props) => props.theme.colors.textColor};
  font-size: 22px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 10px 0;
  text-align: left;

  @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
    margin: 0 10px 0 0;
  }

  &:last-child {
    margin-right: 0;
  }
`

const ExtraControls = styled.div`
  margin-left: auto;
`

Wrapper.defaultProps = {
  id: 'mainTitle',
}

interface Props {
  extraControls?: React.ReactNode
}

export const PageTitle: React.FC<Props> = (props) => {
  const { children, extraControls, ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <Title>{children}</Title>
      <ExtraControls>{extraControls}</ExtraControls>
    </Wrapper>
  )
}
