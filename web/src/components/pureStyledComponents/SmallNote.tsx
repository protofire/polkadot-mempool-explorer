import styled from 'styled-components'

export const SmallNote = styled.p<{ marginBottom?: string }>`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 ${(props) => props.marginBottom} 0;
  padding: 5px 0 0 0;
  text-align: right;
`

SmallNote.defaultProps = {
  marginBottom: '0',
}
