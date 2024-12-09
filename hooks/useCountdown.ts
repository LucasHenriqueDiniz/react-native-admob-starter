import { useEffect, useState } from "react"

export function useCountdown(targetDate: number | null) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!targetDate) return

    const calculateTimeLeft = () => {
      const difference = targetDate + 5 * 60 * 1000 - Date.now()
      return Math.max(0, Math.floor(difference / 1000))
    }

    setSeconds(calculateTimeLeft())
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft()
      setSeconds(timeLeft)
      if (timeLeft === 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return seconds
}
