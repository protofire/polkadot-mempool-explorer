import React from 'react'
import styled from 'styled-components'

import { Spinner, SpinnerSize } from 'components/common/Spinner'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`

const Text = styled.span`
  color: ${(props) => props.theme.colors.mediumGrey};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  margin-left: 8px;
  text-align: left;
`

interface Props {
  text?: string
}

export const TransactionsSpinner: React.FC<Props> = (props) => {
  const { text = 'Loading transactions...', ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <Spinner size={SpinnerSize.small} />
      <Text>{text}</Text>
    </Wrapper>
  )
}
