import React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Button } from 'components/buttons/Button'
import { ButtonType } from 'components/buttons/buttonStylingTypes'
import { Spinner } from 'components/common/Spinner'
import { CheckIcon } from 'components/icons/CheckIcon'
import { ErrorIcon } from 'components/icons/ErrorIcon'
import { BaseCard } from 'components/pureStyledComponents/BaseCard'
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

const InfoCard = styled(BaseCard)`
  width: 220px;
`

const Title = styled.h2`
  font-size: 16px;
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  text-align: left;
`

const IconWrapper = styled(SpinnerWrapper)`
  margin-top: 15px;

  svg {
    height: 50px;
    width: 50px;
  }
`

const ResultButton = styled(Button)`
  margin-top: 35px;
  width: 100%;
`

export enum ResultType {
  error = 'error',
  success = 'success',
}

export interface ResultProps {
  resultType: ResultType
  message: string
  onClick: () => void
}

interface Props {
  isWorking: boolean
  result?: ResultProps | undefined
  text?: string
}

export const FullSpinner = (props: Props) => {
  const { isWorking, result, text = 'Working...' } = props
  const portalContainer = document.getElementById('portalContainer')

  return portalContainer && isWorking
    ? ReactDOM.createPortal(
        <Overlay>
          {result ? (
            <InfoCard>
              <Title>
                {result.resultType === ResultType.error && 'Error'}
                {result.resultType === ResultType.success && 'Success'}
              </Title>
              <IconWrapper>
                {result.resultType === ResultType.error && <ErrorIcon />}
                {result.resultType === ResultType.success && <CheckIcon />}
              </IconWrapper>
              <Text>{result.message}</Text>
              <ResultButton
                buttonType={
                  result.resultType === ResultType.error
                    ? ButtonType.danger
                    : result.resultType === ResultType.success
                    ? ButtonType.primary
                    : undefined
                }
                onClick={result.onClick}
              >
                OK
              </ResultButton>
            </InfoCard>
          ) : (
            <Wrapper>
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
              <Text>{text}</Text>
            </Wrapper>
          )}
        </Overlay>,
        portalContainer
      )
    : null
}
