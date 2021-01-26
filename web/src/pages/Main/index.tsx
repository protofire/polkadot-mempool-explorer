import React from 'react'
import styled from 'styled-components'

import { Dropdown, DropdownItem, DropdownPosition } from 'components/common/Dropdown'
import { ItemPlaceholder } from 'components/common/ItemPlaceholder'
import { Transaction } from 'components/common/Transaction'
import { TransactionsSpinner } from 'components/common/TransactionsSpinner'
import { SearchField } from 'components/form/SearchField'
import { AllTransactions } from 'components/icons/AllTransactions'
import { ChevronDown } from 'components/icons/ChevronDown'
import { InMempool } from 'components/icons/InMempool'
import { JustRemoved } from 'components/icons/JustRemoved'
import { BaseCard } from 'components/pureStyledComponents/BaseCard'
import { CardText } from 'components/pureStyledComponents/CardText'
import { PageTitle } from 'components/text/PageTitle'
import useMempoolExplorer from 'hooks/useMempoolExplorer'

import { Transactions } from './components/Transactions'

const Wrapper = styled.div``

const TitleDropdownButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  padding: 0;
`

const TitleDropdownButtonText = styled.span`
  color: ${(props) => props.theme.colors.mediumGrey};
  font-size: 15px;
  font-weight: 500;
  margin-left: 8px;

  .dropdown:hover &,
  .isOpen & {
    color: ${(props) => props.theme.colors.mediumGr};
  }
`

const TitleDropdownItemText = styled.span`
  margin-left: 8px;
`

const ChevronDownStyled = styled(ChevronDown)`
  flex-shrink: 0;
  margin-left: 12px;

  .fill {
    stroke: ${(props) => props.theme.colors.mediumGrey};
  }

  .dropdown:hover &,
  .isOpen & {
    .fill {
      stroke: ${(props) => props.theme.colors.textColor};
    }
  }
`

export const Main: React.FC = (props) => {
  const { ...restProps } = props
  const titleDropdownItems = [
    {
      onClick: () => setTransactionState('all'),
      text: 'All Transactions',
      icon: <AllTransactions />,
    },
    {
      onClick: () => setTransactionState('inMempool'),
      text: 'In Mempool',
      icon: <InMempool />,
    },
    {
      onClick: () => setTransactionState('justRemoved'),
      text: 'Just Removed',
      icon: <JustRemoved />,
    },
  ]
  const searchDropdownItems = [
    {
      onClick: () => setSearchBy('all'),
      placeholder: 'Search transactions by Tx Hash, Block #, From Address, To Address…',
      text: 'All',
    },
    {
      onClick: () => setSearchBy('tx'),
      placeholder: 'Search transactions by Tx Hash.',
      text: 'Tx Hash',
    },
    {
      onClick: () => setSearchBy('block'),
      placeholder: 'Search transactions by Block #',
      text: 'Block #',
    },
    {
      onClick: () => setSearchBy('from'),
      placeholder: 'Search transactions by From Address.',
      text: 'From Address',
    },
    {
      onClick: () => setSearchBy('to'),
      placeholder: 'Search transactions by To Address.',
      text: 'To Address',
    },
  ]
  const [searchValue, setSearchValue] = React.useState('')
  const [searchBy, setSearchBy] = React.useState('all')
  const [transactionState, setTransactionState] = React.useState('')
  const [currentTitleDropdownItems, setCurrentTitleDropdownItems] = React.useState(0)
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

  return (
    <Wrapper {...restProps}>
      <SearchField
        disabled={isLoadingTransactions}
        dropdownItems={searchDropdownItems}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.currentTarget.value)
        }}
        onClear={() => {
          setSearchValue('')
        }}
        value={searchValue}
      />
      <PageTitle
        extraControls={
          isLoadingTransactions ? (
            <TransactionsSpinner />
          ) : (
            <Dropdown
              activeItemHighlight={true}
              currentItem={currentTitleDropdownItems}
              dropdownButtonContent={
                <TitleDropdownButton>
                  {titleDropdownItems[currentTitleDropdownItems].icon}
                  <TitleDropdownButtonText>
                    {titleDropdownItems[currentTitleDropdownItems].text}
                  </TitleDropdownButtonText>
                  <ChevronDownStyled />
                </TitleDropdownButton>
              }
              dropdownPosition={DropdownPosition.right}
              items={titleDropdownItems.map((item, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    item.onClick()
                    setCurrentTitleDropdownItems(index)
                  }}
                >
                  {item.icon}
                  <TitleDropdownItemText>{item.text}</TitleDropdownItemText>
                </DropdownItem>
              ))}
            />
          )
        }
      >
        Mempool Explorer
      </PageTitle>
      <Transactions
        searchBy={searchBy}
        searchValue={searchValue}
        transactionState={transactionState}
      />
    </Wrapper>
  )
}
