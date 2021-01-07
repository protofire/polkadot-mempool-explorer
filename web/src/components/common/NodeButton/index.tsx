import React from 'react'
import styled from 'styled-components'

import { Button } from 'components/buttons/Button'
import { Dropdown, DropdownItem, DropdownPosition } from 'components/common/Dropdown'
import { FullSpinner } from 'components/common/FullSpinner'
import { Modal } from 'components/common/Modal'
import { ChevronDown } from 'components/icons/ChevronDown'
import { NetworkIcon } from 'components/icons/NetworkIcon'
import { RemoveIcon } from 'components/icons/RemoveIcon'
import { ButtonContainer } from 'components/pureStyledComponents/ButtonContainer'
import { Row } from 'components/pureStyledComponents/Row'
import { SmallNote } from 'components/pureStyledComponents/SmallNote'
import { Textfield } from 'components/pureStyledComponents/Textfield'
import { TitleValue } from 'components/text/TitleValue'

const CustomDropdown = styled(Dropdown)`
  &,
  & .dropdownButton {
    height: 100%;
  }
`

const DropdownButton = styled.button`
  align-items: center;
  background: transparent;
  border-bottom: 3px solid transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  transition: all 0.15s linear;

  &:hover {
    border-bottom-color: #fff;
  }
`

const ChevronDownStyled = styled(ChevronDown)`
  flex-shrink: 0;
  margin-left: 10px;
  margin-top: 2px;

  .fill {
    stroke: #fff;
  }

  .dropdown:hover &,
  .isOpen & {
    .fill {
      stroke: #fff;
    }
  }
`

const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  margin-left: 6px;
`

const ItemsWrapper = styled.div`
  margin-bottom: -1px;
  max-height: 160px;
  overflow: auto;
  width: 200px;
`

const ButtonWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.border.color};
  display: flex;
  padding: 10px 12px;
  width: 200px;
`

const ButtonAdd = styled(Button)`
  font-size: 15px;
  font-weight: 600;
  height: 26px;
  width: 100%;
`

const CustomDropdownItem = styled(DropdownItem)<{ unClickable?: boolean }>`
  align-items: flex-start;
  flex-flow: column;
  position: relative;

  ${(props) => props.unClickable && 'cursor: default; background: transparent!important;'}
`

const ItemNameWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 2px;
  position: relative;
  width: 100%;
  z-index: 1;
`

const ItemName = styled.div`
  overflow: hidden;
  padding-right: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ItemURL = styled.div`
  color: #a2a2a2;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
  z-index: 1;
`

const NodeStatus = styled.div<{ isSelected?: boolean }>`
  background-color: ${(props) => (props.isSelected ? '#34b424' : '#a2a2a2')};
  border-radius: 50%;
  flex-shrink: 0;
  height: 8px;
  margin-right: 6px;
  width: 8px;
`

const ButtonDelete = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  z-index: 5;

  &:hover {
    .fill {
      fill: #e60000;
    }
  }
`

export const NodeButton: React.FC = (props) => {
  const { ...restProps } = props
  const [isWorking, setIsWorking] = React.useState(false)

  const connectToNode = React.useCallback((index: number) => {
    setIsWorking(true)
    setcurrentItem(index)
    setTimeout(() => {
      setIsWorking(false)
    }, 2000)
  }, [])

  const [dropdownItems, setDropdownItems] = React.useState([
    {
      onClick: connectToNode,
      name: 'Main Node',
      url: 'https://mainnodeurl.com',
    },
    {
      onClick: connectToNode,
      name: 'Local Node',
      url: 'https://localnode:3000',
    },
    {
      onClick: connectToNode,
      name: 'Secondary Node',
      url: 'https://someserver.net',
    },
    {
      onClick: connectToNode,
      name: 'Development Node',
      url: 'https://someserver.dev',
    },
    {
      onClick: connectToNode,
      name: 'Some long name to test the limits of this thing and a Staging Node',
      url: 'https://sssssssssssssssssssssssssssssssssstaging.dev',
    },
  ])
  const [currentItem, setcurrentItem] = React.useState(0)

  const removeNode = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
      e.stopPropagation()
      if (confirm(`Remove ${dropdownItems[index].name}?`)) {
        dropdownItems.splice(index, 1)
        setDropdownItems([...dropdownItems])

        if (index === currentItem) {
          connectToNode(0)
        }
      }
    },
    [connectToNode, currentItem, dropdownItems]
  )

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <CustomDropdown
        activeItemHighlight={true}
        currentItem={currentItem}
        dropdownButtonContent={
          <DropdownButton>
            <NetworkIcon />
            <Text>Main Node</Text>
            <ChevronDownStyled />
          </DropdownButton>
        }
        dropdownPosition={DropdownPosition.right}
        items={[
          <ItemsWrapper key="ItemsWrapper">
            {dropdownItems.map((item, index) => (
              <CustomDropdownItem
                key={index}
                onClick={() => {
                  if (typeof item.onClick === 'function' && currentItem !== index) {
                    item.onClick(index)
                  }
                  setcurrentItem(index)
                }}
                unClickable={currentItem === index}
              >
                <ItemNameWrapper>
                  <NodeStatus isSelected={currentItem === index} />
                  <ItemName>{item.name}</ItemName>
                </ItemNameWrapper>
                <ItemURL>{item.url}</ItemURL>
                {index !== 0 && (
                  <ButtonDelete
                    onClick={(e) => {
                      removeNode(e, index)
                    }}
                  >
                    <RemoveIcon />
                  </ButtonDelete>
                )}
              </CustomDropdownItem>
            ))}
          </ItemsWrapper>,
          <ButtonWrapper key="ButtonWrapper">
            <ButtonAdd onClick={() => setIsModalOpen(true)}>Add Node</ButtonAdd>
          </ButtonWrapper>,
        ]}
        {...restProps}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Node">
        <Row>
          <TitleValue title="Node Name" value={<Textfield placeholder="A descriptive name…" />} />
        </Row>
        <Row>
          <TitleValue
            title="Node URL"
            value={
              <>
                <Textfield placeholder="http(s)://yournodeurl…" />
                <SmallNote>
                  <strong>Note:</strong> Transactions&apos; cache and other functionality could be
                  unavailable when you use a custom node.
                </SmallNote>
              </>
            }
          />
        </Row>
        <ButtonContainer>
          <Button onClick={() => setIsModalOpen(false)}>Add</Button>
        </ButtonContainer>
      </Modal>
      <FullSpinner isWorking={isWorking} text="Loading selected node…" />
    </>
  )
}
