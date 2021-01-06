import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``

export const GithubButton: React.FC = (props) => {
  const { ...restProps } = props

  return <Wrapper {...restProps}>asd</Wrapper>
}
