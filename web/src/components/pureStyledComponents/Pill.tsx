import styled, { css } from 'styled-components'

export enum PillTypes {
  primary,
  open,
}

const PillPrimaryCSS = css`
  color: ${(props) => props.theme.pillPrimary.color};
  background-color: ${(props) => props.theme.pillPrimary.backgroundColor};
`

const PillOpenCSS = css`
  color: ${(props) => props.theme.pillOpen.color};
  background-color: ${(props) => props.theme.pillOpen.backgroundColor};
`

export const Pill = styled.div<{ type?: PillTypes }>`
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  height: 22px;
  justify-content: center;
  line-height: 1.2;
  padding: 0 10px;

  ${(props) => props.type === PillTypes.primary && PillPrimaryCSS}
  ${(props) => props.type === PillTypes.open && PillOpenCSS}
`

Pill.defaultProps = {
  type: PillTypes.primary,
}
