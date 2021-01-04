import React from 'react'
import styled from 'styled-components'

import { SearchField } from 'components/form/SearchField'
import { PageTitle } from 'components/text/PageTitle'

const Wrapper = styled.div``

export const Main: React.FC = (props) => {
  const { ...restProps } = props
  const dropdownItems = [
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

  return (
    <Wrapper {...restProps}>
      <SearchField
        dropdownItems={dropdownItems}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.currentTarget.value)
        }}
        onClear={() => {
          setSearchValue('')
        }}
        value={searchValue}
      />
      <PageTitle extraControls={'asdasd'}>Mempool Explorer</PageTitle>
    </Wrapper>
  )
}
