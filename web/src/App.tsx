import React from 'react'
import { Redirect, Route, HashRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Footer, Header } from 'components/layout'
import { BaseCard } from 'components/pureStyledComponents/BaseCard'
import { CardSubtitle } from 'components/pureStyledComponents/CardSubtitle'
import { CardText } from 'components/pureStyledComponents/CardText'
import { InnerContainer } from 'components/pureStyledComponents/InnerContainer'
import { MainScroll } from 'components/pureStyledComponents/MainScroll'
import { MainWrapper } from 'components/pureStyledComponents/MainWrapper'
import { Main } from 'pages/Main'
import theme from 'theme'
import { GlobalStyle } from 'theme/globalStyle'

import 'sanitize.css'

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <MainWrapper>
      <Header />
      <MainScroll>
        <InnerContainer>
          <Router>
            <Switch>
              <Route component={Main} exact path="/main" />
              <Route exact path="/">
                <Redirect to="/main" />
              </Route>
              <Route path="*">
                <BaseCard>
                  <CardSubtitle>Error 404</CardSubtitle>
                  <CardText>Page not found...</CardText>
                </BaseCard>
              </Route>
            </Switch>
          </Router>
        </InnerContainer>
        <Footer />
      </MainScroll>
    </MainWrapper>
  </ThemeProvider>
)
