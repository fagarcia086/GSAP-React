import { gsap } from 'gsap'
import { MutableRefObject, useMemo } from 'react'
import { useIsomorphicLayoutEffect } from '../hooks/use-isomorphic-layout-effect'

export function useGsapContext<T = any>(
  scope: MutableRefObject<T>,
  autoRevert?: boolean
) {
  const context = useMemo(() => gsap.context(() => {}, scope), [scope])

  useIsomorphicLayoutEffect(() => {
    if (autoRevert) return () => context.revert()
  }, [])

  return context
}
