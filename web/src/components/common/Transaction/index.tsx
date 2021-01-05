import React from 'react'
import styled, { css } from 'styled-components'

import { ButtonCopy } from 'components/buttons/ButtonCopy'
import { ButtonExternalLink } from 'components/buttons/ButtonExternalLink'
import { TimeIcon } from 'components/icons/TimeIcon'
import { BaseCard } from 'components/pureStyledComponents/BaseCard'

const Wrapper = styled(BaseCard)`
  margin: 0 0 10px;
  padding: 12px 15px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`

const TopWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  line-height: 1.2;
`

const TitleRow = styled(Row)`
  font-size: 15px;
`

const Label = styled.span`
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 500;
  margin-right: 6px;
`

const ValueCSS = css`
  color: ${(props) => props.theme.colors.mediumGrey};
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`

const Value = styled.span`
  ${ValueCSS}
`

const LinkValue = styled.a`
  ${ValueCSS}
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const TimeWrapper = styled.div`
  align-items: center;
  display: flex;
`

const Time = styled.a`
  color: ${(props) => props.theme.colors.mediumGrey};
  font-size: 13px;
  font-weight: 400;
  line-height: 1.2;
  margin-left: 6px;
  margin-top: -1px;
  text-align: right;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

interface Props {
  data: any
}

export const Transaction: React.FC<Props> = (props) => {
  const { data, ...restProps } = props
  const { time, txHash } = data
  const explorerURL = 'https://polkadot.subscan.io/block/'

  return (
    <Wrapper {...restProps}>
      <TopWrapper>
        <TitleRow>
          <Label>Tx Hash:</Label>
          <LinkValue href={`${explorerURL}${txHash}`} target="_blank">
            {txHash}
          </LinkValue>
          <ButtonCopy value={txHash} />
          <ButtonExternalLink href={`${explorerURL}${txHash}`} style={{ marginLeft: '2px' }} />
        </TitleRow>
        <TimeWrapper>
          <TimeIcon />
          <Time href={`${explorerURL}${txHash}`} target="_blank">
            {time}
          </Time>
        </TimeWrapper>
      </TopWrapper>
    </Wrapper>
  )
}
