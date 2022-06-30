import styled from '@emotion/styled'

import { IntroduceItem } from './components/IntroduceItem'

const TRIPPLE_NUM_OF_TRAVELERS = 700
const TRIPPLE_NUM_OF_REVIEWS = 100
const TRIPPLE_NUM_OF_PLANS = 470

function App() {
  return (
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
  )
}

const IntroduceItemsWrapper = styled.div`
  margin-left: 623px;
  padding-top: 150px;
`

export default App
