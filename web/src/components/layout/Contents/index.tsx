import React from 'react'

import { CookiesBanner } from 'components/common/CookiesBanner'
import { Footer, Header } from 'components/layout'
import { Mainmenu } from 'components/navigation/Mainmenu'
import { InnerContainer } from 'components/pureStyledComponents/InnerContainer'
import { MainScroll } from 'components/pureStyledComponents/MainScroll'
import { MainWrapper } from 'components/pureStyledComponents/MainWrapper'
import { Routes } from 'pages/Routes'

export const Contents: React.FC = () => {
  const [showCookiesBanner, setShowCookiesBanner] = React.useState(false)

  return (
    <MainWrapper>
      <Header />
      <Mainmenu />
      <MainScroll>
        <InnerContainer>
          <Routes />
        </InnerContainer>
        <Footer
          onCookiesBannerShow={() => {
            setShowCookiesBanner(true)
          }}
        />
      </MainScroll>
      <CookiesBanner
        isBannerVisible={showCookiesBanner}
        onHide={() => {
          setShowCookiesBanner(false)
        }}
      />
    </MainWrapper>
  )
}
