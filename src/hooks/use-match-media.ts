import { gsap } from 'gsap'
import { MutableRefObject, useMemo } from 'react'

export function useMatchMedia<T = any>(scope?: MutableRefObject<T>) {
  return useMemo(() => gsap.matchMedia(scope), [scope])
}
