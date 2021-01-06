import React, { DOMAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 0;
`

const Title = styled.div`
  margin: 0 0 5px 0;
`

const TitleText = styled.h2`
  color: ${(props) => props.theme.colors.textColor};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 10px 0 0;
`

const Value = styled.div`
  color: ${(props) => props.theme.colors.textColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;

  a {
    color: ${(props) => props.theme.colors.textColor};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`

interface Props extends DOMAttributes<HTMLDivElement> {
  title: React.ReactNode
  titleControl?: React.ReactNode
  value: React.ReactNode
}

export const TitleValue: React.FC<Props> = (props: Props) => {
  const { title, titleControl = null, value, ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <Title className="title">
        <TitleText>{title}</TitleText>
        {titleControl}
      </Title>
      <Value className="value">{value}</Value>
    </Wrapper>
  )
}
