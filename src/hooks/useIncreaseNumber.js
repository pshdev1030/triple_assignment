import { useState, useEffect, useRef, useCallback } from 'react'

const INITIAL_DELAY = 2000
const INITIAL_NUMBER = 0

function easeOutExpo(t) {
  return t > 1 ? 1 : 1 - Math.pow(2, -5 * t)
}

export const useIncreaseNumber = (
  maxNumber,
  initialNumber = INITIAL_NUMBER,
  duration = INITIAL_DELAY,
) => {
  const [curCount, setcurCount] = useState(initialNumber)
  const curTime = useRef(null)
  const count = useRef(0)

  const step = useCallback((timeStamp) => {
    if (curTime.current === null) {
      curTime.current = timeStamp
    }

    const progress = timeStamp - curTime.current

    const nextCount = parseInt(
      (maxNumber - initialNumber) * easeOutExpo(progress / duration),
    )

    console.log(
      count.current++,
      nextCount,
      progress,
      duration,
      progress / duration,
    )

    setcurCount(nextCount)

    if (progress < duration) {
      window.requestAnimationFrame(step)
    }
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(step)
  }, [])

  return curCount
}
