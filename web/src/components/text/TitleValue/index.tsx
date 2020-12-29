import React, { DOMAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ flexDirection?: string }>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  margin: 0;
  min-width: 0;
`

const Title = styled.div<{ flexDirection?: string }>`
  margin: ${(props) => (props.flexDirection === 'column' ? '0 0 6px 0' : '0 5px 0 0')};

  @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`

const TitleText = styled.h2`
  color: ${(props) => props.theme.colors.darkerGrey};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0 10px 0 0;
  text-transform: uppercase;
`

const Value = styled.div<{ flexDirection?: string; valueUppercase?: boolean }>`
  color: ${(props) => props.theme.colors.textColorDarker};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  text-transform: ${(props) => (props.valueUppercase ? 'uppercase' : 'none')};

  a {
    color: ${(props) => props.theme.colors.textColorDarker};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`

Value.defaultProps = {
  valueUppercase: false,
}

interface Props extends DOMAttributes<HTMLDivElement> {
  flexDirection?: string
  title: React.ReactNode
  titleControl?: React.ReactNode
  value: React.ReactNode
  valueUppercase?: boolean
}

export const TitleValue: React.FC<Props> = (props: Props) => {
  const {
    flexDirection = 'column',
    title,
    titleControl = null,
    value,
    valueUppercase,
    ...restProps
  } = props

  return (
    <Wrapper flexDirection={flexDirection} {...restProps}>
      <Title className="title" flexDirection={flexDirection}>
        <TitleText>{title}</TitleText>
        {titleControl}
      </Title>
      <Value className="value" flexDirection={flexDirection} valueUppercase={valueUppercase}>
        {value}
      </Value>
    </Wrapper>
  )
}
