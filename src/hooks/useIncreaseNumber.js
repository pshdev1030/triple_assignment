import { useState, useEffect, useRef, useCallback } from 'react'

function easeOutExpo(t) {
  return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1
}

export const useIncreaseNumber = (
  maxNumber,
  initialNumber = 0,
  duration = 2000,
) => {
  const [curCount, setcurCount] = useState(initialNumber)
  const curTime = useRef(null)

  const step = useCallback((timeStamp) => {
    if (curTime.current === null) {
      curTime.current = timeStamp
    }

    const progress = timeStamp - curTime.current

    const nextCount = Math.ceil(
      (maxNumber - initialNumber) * easeOutExpo(progress / duration),
    )

    const nextCurCount = nextCount > maxNumber ? maxNumber : nextCount

    setcurCount(nextCurCount)

    if (progress < duration) {
      window.requestAnimationFrame(step)
    }
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(step)
  }, [])

  return curCount
}
