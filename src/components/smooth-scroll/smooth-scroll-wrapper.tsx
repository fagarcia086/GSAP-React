import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { forwardRef, HTMLAttributes } from 'react'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import { useSmoothScroll } from './use-smooth-scroll'

export interface SmoothScrollWrapperProps {
  /**
   * ScrollSmoother create option.
   */
  options?: ScrollSmoother.Vars
  /**
   * Render without containing div wrapper.
   */
  noInitialWrapper?: boolean
}

export const SmoothScrollWrapper = forwardRef<
  HTMLDivElement,
  SmoothScrollWrapperProps & HTMLAttributes<HTMLDivElement>
>(({ children, options, noInitialWrapper, ...props }, ref) => {
  const { setSmoother } = useSmoothScroll()

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    let ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        ...options,
      })

      setSmoother(smoother)

      return () => {
        setSmoother(null)
      }
    })

    return () => {
      ctx.revert()
    }
  }, [])

  if (noInitialWrapper) return <>{children}</>

  return (
    <div ref={ref} id="smooth-wrapper" {...props}>
      <div id="smooth-content">{children}</div>
    </div>
  )
})

SmoothScrollWrapper.displayName = 'SmoothScrollWrapper'
