import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
  align-items: center;
  display: flex;
`

const LogoSVG = styled.svg`
  height: 36px;
  width: 126px;
`

export const Logo: React.FC = (props) => {
  return (
    <Wrapper {...props}>
      <LogoSVG height="36" viewBox="0 0 126 36" width="126" xmlns="http://www.w3.org/2000/svg">
        <text
          fill="#fff"
          fontFamily="WorkSans-Bold, Work Sans"
          fontSize="20px"
          fontWeight="700"
          transform="translate(0 19)"
        >
          <tspan x="0" y="0">
            POLKADOT
          </tspan>
          <tspan fontFamily="WorkSans-Medium, Work Sans" fontSize="14px" fontWeight="500">
            <tspan x="0" y="14">
              Mempool Explorer
            </tspan>
          </tspan>
        </text>
      </LogoSVG>
    </Wrapper>
  )
}
