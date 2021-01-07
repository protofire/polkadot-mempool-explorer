import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;
`

export const SpinnerSVG: React.FC = (props) => {
  return (
    <Wrapper
      height="40"
      viewBox="0 0 40 40"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28.819 2l2.362 1.364-3.128 5.416-2.362-1.364zM38 11.181l-1.361-2.362-5.419 3.128 1.364 2.362zm-4.256 10.183H40v-2.728h-6.256zm-2.524 6.689l5.419 3.128L38 28.819l-5.419-3.128zm-5.529 4.531L28.819 38l2.362-1.364-3.128-5.416zM18.636 40h2.727v-6.256h-2.727zm-9.817-3.361L11.181 38l3.128-5.419-2.362-1.361zM2 28.819l1.364 2.362 5.416-3.128-1.364-2.362zm-2-7.455h6.256v-2.728H0zm8.78-9.416L3.361 8.819 2 11.181l5.418 3.128zm.039-8.586l3.128 5.418 2.362-1.364L11.181 2zm9.817 2.895h2.727V0h-2.727z"
        fill="#e6007a"
      />
    </Wrapper>
  )
}
