import styled from '@emotion/styled'

import appleImage from './assets/images/badge-apple4x.png'
import googleImage from './assets/images/play-store2x.png'
import { FadeIn } from './components/FadeIn'
import { IntroduceItem } from './components/IntroduceItem'
import { AwardItem } from './components/AwardItem'
const FADEIN_ANIMATION_DURATION = 700
const TRIPPLE_INFO_FADEIN_DELAY = 200
const TRIPPLE_AWARD_FADEIN_DELAY = 300

const TRIPPLE_NUM_OF_TRAVELERS = 700
const TRIPPLE_NUM_OF_REVIEWS = 100
const TRIPPLE_NUM_OF_PLANS = 470

function App() {
  return (
    <>
      <FadeIn
        duration={FADEIN_ANIMATION_DURATION}
        delay={TRIPPLE_INFO_FADEIN_DELAY}
      >
        <IntroduceItemsWrapper>
          <IntroduceItem
            itemMaxNumber={TRIPPLE_NUM_OF_TRAVELERS}
            unit="만 명"
            description="의 여행자"
          />
          <IntroduceItem
            itemMaxNumber={TRIPPLE_NUM_OF_REVIEWS}
            unit="만 개"
            description="의 여행 리뷰"
          />
          <IntroduceItem
            itemMaxNumber={TRIPPLE_NUM_OF_PLANS}
            unit="만 개"
            description="의 여행 일정"
          />
        </IntroduceItemsWrapper>
      </FadeIn>
      <FadeIn
        duration={FADEIN_ANIMATION_DURATION}
        delay={TRIPPLE_AWARD_FADEIN_DELAY}
      >
        <AwardsWrapper>
          <AwardItem
            imageSrc={googleImage}
            title="2018 구글 플레이스토어"
            description="올해의 앱 최우수상 수상"
          />
          <AwardItem
            imageSrc={appleImage}
            title="2018 애플 앱스토어"
            description="오늘의 여행앱 선정"
          />
        </AwardsWrapper>
      </FadeIn>
    </>
  )
}

const IntroduceItemsWrapper = styled.div`
  margin-left: 623px;
  padding-top: 150px;
`

const AwardsWrapper = styled.div`
  margin: 50px 0 140px 623px;
  white-space: nowrap;
`

export default App
