import { PropsWithChildren, useEffect } from "react"
import { useSubscription } from "hooks"

interface Props extends PropsWithChildren {
  _subscriptionIds?: string[] // unused but kept for backwards compatibility
}

export function SubscriptionProvider({ children }: Props) {
  const { getPackages } = useSubscription()

  useEffect(() => {
    getPackages()
  }, [getPackages])

  return children
}
