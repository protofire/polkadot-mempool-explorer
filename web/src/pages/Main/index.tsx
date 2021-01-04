import React from 'react'
import styled from 'styled-components'

import { Dropdown, DropdownItem, DropdownPosition } from 'components/common/Dropdown'
import { SearchField } from 'components/form/SearchField'
import { ChevronDown } from 'components/icons/ChevronDown'
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

  .isOpen & {
    color: ${(props) => props.theme.colors.textColor};
  }
`

const ChevronDownStyled = styled(ChevronDown)`
  flex-shrink: 0;
  margin-left: 12px;

  .fill {
    stroke: ${(props) => props.theme.colors.mediumGrey};
  }

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
        console.log('All')
      },
      placeholder: 'Search transactions by Tx Hash, Block #, From Address, To Address…',
      text: 'All',
    },
    {
      onClick: () => {
        console.log('Tx Hash')
      },
      placeholder: 'Search transactions by Tx Hash.',
      text: 'Tx Hash',
    },
    {
      onClick: () => {
        console.log('Block #')
      },
      placeholder: 'Search transactions by Block #',
      text: 'Block #',
    },
    {
      onClick: () => {
        console.log('From Address')
      },
      placeholder: 'Search transactions by From Address.',
      text: 'From Address',
    },
    {
      onClick: () => {
        console.log('To Address')
      },
      placeholder: 'Search transactions by To Address.',
      text: 'To Address',
    },
  ]
  const [searchValue, setSearchValue] = React.useState('')
  const titleDropdownItems = [
    {
      onClick: () => {
        console.log('All Transactions')
      },
      text: 'All Transactions',
    },
    {
      onClick: () => {
        console.log('In Mempool')
      },
      text: 'In Mempool',
    },
    {
      onClick: () => {
        console.log('Just Removed')
      },
      text: 'Just Removed',
    },
  ]
  const [currentTitleDropdownItems, setCurrentTitleDropdownItems] = React.useState(0)

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
                {item.text}
              </DropdownItem>
            ))}
          />
        }
      >
        Mempool Explorer
      </PageTitle>
    </Wrapper>
  )
}
