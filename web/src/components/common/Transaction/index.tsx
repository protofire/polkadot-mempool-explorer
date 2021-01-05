import React from 'react'
import styled, { css } from 'styled-components'

import { ButtonCopy } from 'components/buttons/ButtonCopy'
import { ButtonExternalLink } from 'components/buttons/ButtonExternalLink'
import { CheckIcon } from 'components/icons/CheckIcon'
import { ErrorIcon } from 'components/icons/ErrorIcon'
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

const ValuesGrid = styled.div`
  column-gap: 25px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 17px;
  row-gap: 5px;
`

const ButtonExternalLinkMini = styled(ButtonExternalLink)`
  height: 18px;
  width: 18px;

  svg {
    height: 7px;
    width: 7px;
  }
`

interface Props {
  data: any
}

export const Transaction: React.FC<Props> = (props) => {
  const { data, ...restProps } = props
  const { blockNumber, extrinsicType, nonce, result, time, txHash } = data
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
      <ValuesGrid>
        {blockNumber && (
          <Row>
            <Label>Block Number:</Label>
            <LinkValue href={`${explorerURL}${blockNumber}`} target="_blank">
              #{blockNumber}
            </LinkValue>
            <ButtonExternalLinkMini href={`${explorerURL}${blockNumber}`} />
          </Row>
        )}
        {nonce && (
          <Row>
            <Label>Nonce:</Label>
            <Value>{nonce}</Value>
          </Row>
        )}
        {extrinsicType && (
          <Row>
            <Label>Extrinsic Type:</Label>
            <Value>{extrinsicType}</Value>
          </Row>
        )}
        {result && (
          <Row>
            <Label>Result:</Label>
            <Value style={{ textTransform: 'capitalize' }}>{result}</Value>
            {result === 'valid' && <CheckIcon />}
            {result === 'invalid' && <ErrorIcon />}
          </Row>
        )}
      </ValuesGrid>
    </Wrapper>
  )
}
