import React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Spinner } from 'components/common/Spinner'
import { Overlay } from 'components/pureStyledComponents/Overlay'

const Wrapper = styled.div``

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

const Text = styled.p`
  color: ${(props) => props.theme.colors.textColor};
  font-size: 15px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  text-align: center;
`

interface Props {
  isWorking: boolean
  text?: string
}

export const FullSpinner = (props: Props) => {
  const { isWorking, text = 'Working...' } = props
  const portalContainer = document.getElementById('portalContainer')

  return portalContainer && isWorking
    ? ReactDOM.createPortal(
        <Overlay>
          <Wrapper>
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
            <Text>{text}</Text>
          </Wrapper>
        </Overlay>,
        portalContainer
      )
    : null
}
