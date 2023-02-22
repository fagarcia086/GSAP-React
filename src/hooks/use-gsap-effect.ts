import { gsap } from 'gsap'
import { MutableRefObject, useState } from 'react'

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

export function useGsapEffect<T = any>(
  target: MutableRefObject<T>,
  effect: string,
  vars?: Record<string, any>
) {
  const [animation, setAnimation] = useState()

  useIsomorphicLayoutEffect(() => {
    setAnimation(gsap.effects[effect](target.current, vars))
  }, [effect])

  return animation
}
