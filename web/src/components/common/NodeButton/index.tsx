import React from 'react'
import styled from 'styled-components'

import { Button } from 'components/buttons/Button'
import { Dropdown, DropdownItem, DropdownPosition } from 'components/common/Dropdown'
import { FullSpinner, ResultType } from 'components/common/FullSpinner'
import { Modal } from 'components/common/Modal'
import { ChevronDown } from 'components/icons/ChevronDown'
import { NetworkIcon } from 'components/icons/NetworkIcon'
import { RemoveIcon } from 'components/icons/RemoveIcon'
import { ButtonContainer } from 'components/pureStyledComponents/ButtonContainer'
import { Row } from 'components/pureStyledComponents/Row'
import { SmallNote } from 'components/pureStyledComponents/SmallNote'
import { Textfield } from 'components/pureStyledComponents/Textfield'
import { TitleValue } from 'components/text/TitleValue'
import useMempoolExplorer from 'hooks/useMempoolExplorer'

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
  const {
    apiError,
    deleteNetwork,
    isLoadingNetworks,
    networks,
    selectNetwork,
    selectedNetwork,
  } = useMempoolExplorer()
  let result

  if (apiError) {
    result = {
      message: apiError,
      onClick: () => ({}),
      resultType: ResultType.error,
    }
  }

  const addNode = React.useCallback(() => {
    // let's simulate adding and connecting to a node
    setIsModalOpen(false)
  }, [])

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [nodeName, setNodeName] = React.useState('')
  const [nodeURL, setNodeURL] = React.useState('')
  const buttonDisabled = !nodeName || !nodeURL

  return (
    <>
      <CustomDropdown
        activeItemHighlight={true}
        dropdownButtonContent={
          <DropdownButton>
            <NetworkIcon />
            <Text>{selectedNetwork.name}</Text>
            <ChevronDownStyled />
          </DropdownButton>
        }
        dropdownPosition={DropdownPosition.right}
        items={[
          <ItemsWrapper key="ItemsWrapper">
            {networks.map((item, index) => (
              <CustomDropdownItem
                key={index}
                onClick={() => selectNetwork(item)}
                unClickable={selectedNetwork.id === item.id}
              >
                <ItemNameWrapper>
                  <NodeStatus isSelected={selectedNetwork.id === item.id} />
                  <ItemName>{item.name}</ItemName>
                </ItemNameWrapper>
                <ItemURL>{item.url}</ItemURL>
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
          <TitleValue
            title="Node Name"
            value={
              <Textfield
                onChange={(e) => setNodeName(e.currentTarget.value)}
                placeholder="A descriptive name…"
                value={nodeName}
              />
            }
          />
        </Row>
        <Row>
          <TitleValue
            title="Node URL"
            value={
              <>
                <Textfield
                  onChange={(e) => setNodeURL(e.currentTarget.value)}
                  placeholder="http(s)://yournodeurl…"
                  value={nodeURL}
                />
                <SmallNote>
                  <strong>Note:</strong> Transactions&apos; cache and other functionality could be
                  unavailable when you use a custom node.
                </SmallNote>
              </>
            }
          />
        </Row>
        <ButtonContainer>
          <Button disabled={buttonDisabled} onClick={addNode}>
            Add
          </Button>
        </ButtonContainer>
      </Modal>
      <FullSpinner isWorking={isLoadingNetworks} result={result} text="Loading selected node…" />
    </>
  )
}
