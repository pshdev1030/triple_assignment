import { useIncreaseNumber } from '../hooks/useIncreaseNumber'

export const IncreaseNumber = ({ maxNumber, initialNumber, duration }) => {
  const increaseNumber = useIncreaseNumber(maxNumber, initialNumber, duration)

  return <>{increaseNumber}</>
}
