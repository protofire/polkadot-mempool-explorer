import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
  padding-top: 36px;
`

const Title = styled.h2`
  color: ${(props) => props.theme.colors.darkBlue};
  font-size: 28px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 10px 0 0;
  text-align: left;

  &:last-child {
    margin-right: 0;
  }
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
      {extraControls}
    </Wrapper>
  )
}
