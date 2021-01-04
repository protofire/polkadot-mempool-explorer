import React, { useState } from 'react'
import styled from 'styled-components'

import { Dropdown, DropdownItem, DropdownPosition } from 'components/common/Dropdown'
import { ChevronDown } from 'components/icons/ChevronDown'
import { ClearSearch } from 'components/icons/ClearSearch'
import { Textfield } from 'components/pureStyledComponents/Textfield'

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f3f3f3;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  display: flex;
  height: 36px;
  max-width: 100%;
  width: 100%;

  .dropdown,
  .dropdownButton {
    flex-shrink: 0;
    height: 100%;
  }
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
  padding-left: 20px;
  padding-right: 20px;
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

const DropdownButtonText = styled.span`
  flex-shrink: 0;
  max-width: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ButtonDropdown = styled.button`
  align-items: center;
  background-color: transparent;
  border-bottom-left-radius: 4px;
  border-bottom: none;
  border-left: none;
  border-right: 1px solid #e6e9ed;
  border-top-left-radius: 4px;
  border-top: none;
  color: ${(props) => props.theme.colors.mediumGrey};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-size: 15px;
  font-weight: 400;
  height: 100%;
  justify-content: space-between;
  line-height: 1.2;
  min-width: 80px;
  outline: none;
  padding: 0 20px;

  .fill {
    stroke: ${(props) => props.theme.colors.mediumGrey};
  }

  .isOpen & {
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;

    .fill {
      stroke: #fff;
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
      {dropdownItems && (
        <Dropdown
          activeItemHighlight={true}
          currentItem={currentItem}
          disabled={disabled}
          dropdownButtonContent={
            <ButtonDropdown>
              <DropdownButtonText>
                {dropdownItems && dropdownItems[currentItem].text}
              </DropdownButtonText>
              <ChevronDownStyled />
            </ButtonDropdown>
          }
          dropdownPosition={DropdownPosition.left}
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
    </Wrapper>
  )
}
