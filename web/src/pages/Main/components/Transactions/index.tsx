import React from 'react'

import { ItemPlaceholder } from 'components/common/ItemPlaceholder'
import { Transaction } from 'components/common/Transaction'
import { BaseCard } from 'components/pureStyledComponents/BaseCard'
import { CardText } from 'components/pureStyledComponents/CardText'
import useMempoolExplorer from 'hooks/useMempoolExplorer'

interface Props {
  searchBy: string
  searchValue: string
  transactionState: string
}

export const Transactions: React.FC<Props> = (props) => {
  const { searchBy, searchValue, transactionState } = props
  const { isLoadingTransactions, transactions } = useMempoolExplorer()
  let filterTransactions = transactions

  if (searchValue !== '') {
    filterTransactions = filterTransactions.filter((transaction) => {
      switch (searchBy) {
        case 'tx':
          return transaction.hash === searchValue
        case 'block':
          return transaction.block_number === searchValue
        case 'from':
          return transaction.from === searchValue
        case 'to':
          return transaction.to === searchValue
        default:
          return [
            transaction.hash,
            transaction.block_number,
            transaction.from,
            transaction.to,
          ].includes(searchValue)
      }
    })
  }

  if (transactionState !== 'all') {
    filterTransactions = filterTransactions.filter((transaction) => {
      if (transactionState === 'inMempool' && transaction.isFinalized) {
        return false
      } else if (transactionState === 'inMempool' && !transaction.isFinalized) {
        return true
      } else if (transactionState === 'justRemoved' && transaction.isFinalized) {
        return true
      } else if (transactionState === 'justRemoved' && !transaction.isFinalized) {
        return false
      } else {
        return true
      }
    })
  }

  if (!isLoadingTransactions && filterTransactions.length === 0) {
    return (
      <BaseCard>
        <CardText>No pending extrinsics in the pool.</CardText>
      </BaseCard>
    )
  }

  return (
    <>
      {isLoadingTransactions && filterTransactions.length < 1
        ? Array.from({ length: 10 }, (_, i) => i).map((index) => (
            <ItemPlaceholder key={index} opacity={(1 - index * 0.15).toString()} />
          ))
        : filterTransactions.map((item, index) => {
            return <Transaction data={item} key={index} />
          })}
    </>
  )
}
