import React, { useState } from 'react'
import styled from 'styled-components'

import { Dropdown, DropdownItem, DropdownPosition } from 'components/common/Dropdown'
import { ChevronDown } from 'components/icons/ChevronDown'
import { ClearSearch } from 'components/icons/ClearSearch'
import { Magnifier } from 'components/icons/Magnifier'
import { Textfield } from 'components/pureStyledComponents/Textfield'

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  border-radius: 4px;
  display: flex;
  height: 32px;
  max-width: 100%;
  width: 450px;

  .dropdown,
  .dropdownButton {
    flex-shrink: 0;
    height: 100%;
  }

  .dropdown.isOpen {
    background-color: ${(props) => props.theme.colors.primary};
  }
`

const SearchIconWrapper = styled.label`
  align-items: center;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  justify-content: center;
  width: 35px;
`

const Input = styled(Textfield)`
  background-color: transparent;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.textColor};
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 15px;
  font-weight: normal;
  height: 100%;
  overflow: hidden;
  padding-left: 0;
  padding-right: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;

  &::placeholder {
    color: ${(props) => props.theme.colors.mediumGray};
    font-size: 15px;
    font-weight: normal;
  }

  &:-webkit-autofill:focus {
    background-color: transparent;
    color: ${(props) => props.theme.colors.textColor};
    font-size: 15px;
  }

  &,
  &:focus,
  &:active {
    border: none;
  }
`

const ClearSearchButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  justify-content: center;
  outline: none;
  padding: 0;
  width: 35px;

  &:active {
    .fill {
      fill: #000;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const ClearSearchButtonText = styled.span`
  flex-shrink: 0;
  max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ButtonDropdown = styled.button`
  align-items: center;
  background-color: transparent;
  border-bottom-right-radius: 4px;
  border-bottom: none;
  border-left: 1px solid ${(props) => props.theme.colors.mediumGrey};
  border-right: none;
  border-top-right-radius: 4px;
  border-top: none;
  color: ${(props) => props.theme.colors.darkerGrey};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 400;
  height: 100%;
  justify-content: space-between;
  line-height: 1.2;
  max-width: 170px;
  min-width: 80px;
  outline: none;
  padding: 0 12px;

  .fill {
    fill: ${(props) => props.theme.colors.darkerGrey};
  }

  .isOpen & {
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;

    .fill {
      fill: #fff;
    }
  }
`

const ChevronDownStyled = styled(ChevronDown)`
  flex-shrink: 0;
  margin-left: 12px;
`

interface Props {
  disabled?: boolean
  dropdownItems?: Array<{ onClick: () => void; placeholder: string; text: string }>
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  placeholder?: string | undefined
  value: string | number | readonly string[] | undefined
}

export const SearchField: React.FC<Props> = (props) => {
  const { disabled, dropdownItems, onChange, onClear, placeholder, value, ...restProps } = props

  const [currentItem, setCurrentItem] = useState(0)

  return (
    <Wrapper {...restProps}>
      <SearchIconWrapper htmlFor="searchField">
        <Magnifier />
      </SearchIconWrapper>
      <Input
        autoComplete="off"
        disabled={disabled}
        id="searchField"
        onChange={onChange}
        placeholder={
          placeholder
            ? placeholder
            : dropdownItems && dropdownItems[currentItem].placeholder
            ? dropdownItems[currentItem].placeholder
            : ''
        }
        type="text"
        value={value}
      />
      {onClear && (
        <ClearSearchButton disabled={!value || disabled} onClick={onClear}>
          <ClearSearch />
        </ClearSearchButton>
      )}
      {dropdownItems && (
        <Dropdown
          activeItemHighlight={true}
          currentItem={currentItem}
          disabled={disabled}
          dropdownButtonContent={
            <ButtonDropdown>
              <ClearSearchButtonText>
                {dropdownItems && dropdownItems[currentItem].text}
              </ClearSearchButtonText>
              <ChevronDownStyled />
            </ButtonDropdown>
          }
          dropdownPosition={DropdownPosition.right}
          items={dropdownItems.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                item.onClick()
                setCurrentItem(index)
              }}
            >
              {item.text}
            </DropdownItem>
          ))}
        />
      )}
    </Wrapper>
  )
}
