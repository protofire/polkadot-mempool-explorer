import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Footer, Header } from 'components/layout'
import { InnerContainer } from 'components/pureStyledComponents/InnerContainer'
import { MainScroll } from 'components/pureStyledComponents/MainScroll'
import { MainWrapper } from 'components/pureStyledComponents/MainWrapper'
import theme from 'theme'
import { GlobalStyle } from 'theme/globalStyle'

import 'sanitize.css'

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <MainWrapper>
      <Header />
      <MainScroll>
        <InnerContainer>Stuff</InnerContainer>
        <Footer />
      </MainScroll>
    </MainWrapper>
  </ThemeProvider>
)
