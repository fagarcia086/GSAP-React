import { useContext } from 'react'
import { SmoothScrollContext } from './smooth-scroll-context'

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)

  if (!context)
    throw new Error('useSmoothScroll must be within SmoothScrollProvider')

  return context
}
