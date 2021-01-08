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
import { PageTitle } from 'components/text/PageTitle'
import useMempoolExplorer from 'hooks/useMempoolExplorer'

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
  const searchDropdownItems = [
    {
      onClick: () => {
        /* */
      },
      placeholder: 'Search transactions by Tx Hash, Block #, From Address, To Address…',
      text: 'All',
    },
    {
      onClick: () => {
        /* */
      },
      placeholder: 'Search transactions by Tx Hash.',
      text: 'Tx Hash',
    },
    {
      onClick: () => {
        /* */
      },
      placeholder: 'Search transactions by Block #',
      text: 'Block #',
    },
    {
      onClick: () => {
        /* */
      },
      placeholder: 'Search transactions by From Address.',
      text: 'From Address',
    },
    {
      onClick: () => {
        /* */
      },
      placeholder: 'Search transactions by To Address.',
      text: 'To Address',
    },
  ]
  const [searchValue, setSearchValue] = React.useState('')
  const titleDropdownItems = [
    {
      onClick: () => {
        console.log('pase')
      },
      text: 'All Transactions',
      icon: <AllTransactions />,
    },
    {
      onClick: () => {
        console.log('pase')
      },
      text: 'In Mempool',
      icon: <InMempool />,
    },
    {
      onClick: () => {
        console.log('pase')
      },
      text: 'Just Removed',
      icon: <JustRemoved />,
    },
  ]
  const [currentTitleDropdownItems, setCurrentTitleDropdownItems] = React.useState(0)
  const { isLoadingTransactions, selectedNetwork, transactions } = useMempoolExplorer()

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
      {isLoadingTransactions && transactions.length < 1
        ? [0, 1, 2, 3, 4, 5].map((index) => (
            <ItemPlaceholder key={index} opacity={(1 - index * 0.15).toString()} />
          ))
        : transactions.map((item, index) => {
            return <Transaction data={item} key={index} />
          })}
    </Wrapper>
  )
}
