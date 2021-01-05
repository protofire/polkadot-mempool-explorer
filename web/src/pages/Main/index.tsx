import React from 'react'
import styled from 'styled-components'

import { Dropdown, DropdownItem, DropdownPosition } from 'components/common/Dropdown'
import { Transaction } from 'components/common/Transaction'
import { SearchField } from 'components/form/SearchField'
import { AllTransactions } from 'components/icons/AllTransactions'
import { ChevronDown } from 'components/icons/ChevronDown'
import { InMempool } from 'components/icons/InMempool'
import { JustRemoved } from 'components/icons/JustRemoved'
import { PageTitle } from 'components/text/PageTitle'

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
        /* */
      },
      text: 'All Transactions',
      icon: <AllTransactions />,
    },
    {
      onClick: () => {
        /* */
      },
      text: 'In Mempool',
      icon: <InMempool />,
    },
    {
      onClick: () => {
        /* */
      },
      text: 'Just Removed',
      icon: <JustRemoved />,
    },
  ]
  const [currentTitleDropdownItems, setCurrentTitleDropdownItems] = React.useState(0)

  const transactions = [
    {
      balanceTransfer: '1000.00',
      blockNumber: '2826376',
      extrinsicType: 'Signed Transaction',
      from: '12vCR1Sft2YHzgmtojLLDD4recFbFMUAfg6pKavW48FZYKtK',
      inMempool: true,
      nonce: '0',
      result: 'valid',
      time: 'Dec 9, 2020, 3:30:42 PM',
      to: '1WcFohjQoCfuqHhZK3vPpkgSv4ebHHwGDjuNG1jbz97kfnJ',
      txHash: '0xedcf1c01ed167f662bd64b7a68f6cfa16f5c23b126d82f3ee958226aacbbd3a1',
    },
    {
      blockNumber: '2826374',
      extrinsicType: 'Inherit',
      inMempool: true,
      nonce: '0',
      result: 'valid',
      time: 'Dec 9, 2020, 2:54:15 PM',
      txHash: '0x219dd50cc7122234749d3fcaa3d1d160eb394b3927c4941ea4e910588c1f05fc',
    },
    {
      balanceTransfer: '1.55',
      blockNumber: '2826373',
      extrinsicType: 'Signed Transaction',
      from: '14Kazg6SFiUCH7FNhvBhvr4WNfAXVtKKKhtBQ1pvXzF1dQhv',
      inMempool: false,
      nonce: '0',
      result: 'invalid',
      time: 'Dec 9, 2020, 2:49:13 PM',
      to: '1WcFohjQoCfuqHhZK3vPpkgSv4ebHHwGDjuNG1jbz97kfnJ',
      txHash: '0x59a764f8f56fb3614965adb2a9bebe69ec9d606a9a586c8b81845526f8f7259e',
    },
    {
      blockNumber: '2826372',
      extrinsicType: 'Unsigned Transaction',
      inMempool: false,
      result: 'valid',
      time: 'Dec 9, 2020, 2:47:05 PM',
      txHash: '0x5d6d2bb34e3407045e630baeb6705bae837d52138e9af7639a8f95bcdb6a07ec',
    },
  ]

  return (
    <Wrapper {...restProps}>
      <SearchField
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
        }
      >
        Mempool Explorer
      </PageTitle>
      {transactions.map((item, index) => {
        return <Transaction data={item} key={index} />
      })}
    </Wrapper>
  )
}
