import React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'

import { CloseIcon } from 'components/icons/CloseIcon'
import { BaseCard } from 'components/pureStyledComponents/BaseCard'
import { Overlay } from 'components/pureStyledComponents/Overlay'

const ModalCard = styled(BaseCard)`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  width: 320px;
`

const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

const Title = styled.h2`
  font-size: 16px;
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  text-align: left;
`

const CloseButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 15px;
  outline: none;
  padding: 0;
  width: 15px;

  .fill {
    fill: ${(props) => props.theme.colors.textColor};
  }
`

interface Props {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
}

export const Modal = (props: Props) => {
  const { children, isOpen, onClose, title } = props
  const portalContainer = document.getElementById('portalContainer')

  return portalContainer && isOpen
    ? ReactDOM.createPortal(
        <Overlay onClick={onClose}>
          <ModalCard
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <TitleWrapper>
              <Title>{title}</Title>
              <CloseButton onClick={onClose}>
                <CloseIcon />
              </CloseButton>
            </TitleWrapper>
            {children}
          </ModalCard>
        </Overlay>,
        portalContainer
      )
    : null
}
