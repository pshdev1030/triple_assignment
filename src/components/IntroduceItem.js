import styled from '@emotion/styled'
import { IncreaseNumber } from './IncreaseNumber'

export const IntroduceItem = ({ itemMaxNumber, unit, description }) => {
  return (
    <IntroduceItemWrapper>
      <strong>
        <IncreaseNumber maxNumber={itemMaxNumber} />
        {unit}
      </strong>
      {description}
    </IntroduceItemWrapper>
  )
}

const IntroduceItemWrapper = styled.div`
  font-size: 36px;
  letter-spacing: -1px;
  margin-bottom: 20px;
  color: rgb(58, 58, 58);
`
