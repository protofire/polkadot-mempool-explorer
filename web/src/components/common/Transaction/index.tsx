import React from 'react'
import styled, { css } from 'styled-components'

import { ButtonCopy } from 'components/buttons/ButtonCopy'
import { ButtonExternalLink } from 'components/buttons/ButtonExternalLink'
import { CheckIcon } from 'components/icons/CheckIcon'
import { ErrorIcon } from 'components/icons/ErrorIcon'
import { TimeIcon } from 'components/icons/TimeIcon'
import { TransferArrow } from 'components/icons/TransferArrow'
import { BaseCard } from 'components/pureStyledComponents/BaseCard'
import Identicon from 'react-hooks-identicons'

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
  margin-bottom: 4px;
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
  line-height: 1.2;
  margin-right: 6px;
  white-space: nowrap;
`

const VerticalLabel = styled.span`
  display: block;
  margin-bottom: -3px;
  margin-right: 0;
`

const ValueCSS = css`
  color: ${(props) => props.theme.colors.mediumGrey};
  line-height: 1.2;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

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
  column-gap: 20px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 17px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ButtonExternalLinkMini = styled(ButtonExternalLink)`
  height: 18px;
  width: 18px;

  svg {
    height: 7px;
    width: 7px;
  }
`

const BalanceTransferValue = styled(Value)`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
`

const BalanceTransfer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
`

const TransferSubject = styled.div`
  column-gap: 8px;
  display: grid;
  grid-template-columns: 32px 1fr;
`

const TransferIconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`
const IdenticonCol = styled.div`
  padding-top: 5px;
`
const IdenticonWrapper = styled.div`
  border-radius: 50%;
  height: 32px;
  overflow: hidden;
  width: 32px;

  canvas {
    display: block;
  }
`

const TransferInfo = styled.div``

interface Props {
  data: any
}

export const Transaction: React.FC<Props> = (props) => {
  const { data, ...restProps } = props
  const {
    balanceTransfer,
    blockNumber,
    extrinsicType,
    from,
    nonce,
    result,
    time,
    to,
    txHash,
  } = data
  const explorerURL = 'https://polkadot.subscan.io/'
  const blockURL = `${explorerURL}block/`
  const accountURL = `${explorerURL}account/`

  return (
    <Wrapper {...restProps}>
      <TopWrapper>
        <TitleRow>
          <Label>Tx Hash:</Label>
          <LinkValue href={`${blockURL}${txHash}`} target="_blank">
            {txHash}
          </LinkValue>
          <ButtonCopy value={txHash} />
          <ButtonExternalLink href={`${blockURL}${txHash}`} style={{ marginLeft: '2px' }} />
        </TitleRow>
        <TimeWrapper>
          <TimeIcon />
          <Time href={`${blockURL}${txHash}`} target="_blank">
            {time}
          </Time>
        </TimeWrapper>
      </TopWrapper>
      <ValuesGrid>
        {blockNumber && (
          <Row>
            <Label>Block Number:</Label>
            <LinkValue href={`${blockURL}${blockNumber}`} target="_blank">
              #{blockNumber}
            </LinkValue>
            <ButtonExternalLinkMini href={`${blockURL}${blockNumber}`} />
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
      {balanceTransfer && (
        <>
          <TitleRow>
            <Label>Balance Transfer</Label>
            <BalanceTransferValue>({balanceTransfer} DOT)</BalanceTransferValue>
          </TitleRow>
          <BalanceTransfer>
            <TransferSubject>
              <IdenticonCol>
                <IdenticonWrapper>
                  {<Identicon bg="#f0f1f2" count="5" size="33" string={from} />}
                </IdenticonWrapper>
              </IdenticonCol>
              <TransferInfo>
                <VerticalLabel>From</VerticalLabel>
                <Row>
                  <LinkValue href={`${accountURL}${from}`} target="_blank">
                    {from}
                  </LinkValue>
                  <ButtonCopy value={from} />
                  <ButtonExternalLink href={`${accountURL}${from}`} style={{ marginLeft: '2px' }} />
                </Row>
              </TransferInfo>
            </TransferSubject>
            <TransferIconWrapper>
              <TransferArrow />
            </TransferIconWrapper>
            <TransferSubject>
              <IdenticonCol>
                <IdenticonWrapper>
                  {<Identicon bg="#f0f1f2" count="5" size="33" string={to} />}
                </IdenticonWrapper>
              </IdenticonCol>
              <TransferInfo>
                <VerticalLabel>To</VerticalLabel>
                <Row>
                  <LinkValue href={`${accountURL}${to}`} target="_blank">
                    {to}
                  </LinkValue>
                  <ButtonCopy value={to} />
                  <ButtonExternalLink href={`${accountURL}${to}`} style={{ marginLeft: '2px' }} />
                </Row>
              </TransferInfo>
            </TransferSubject>
          </BalanceTransfer>
        </>
      )}
    </Wrapper>
  )
}
