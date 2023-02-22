import { ReactNode } from 'react'
import { SmoothScrollProvider } from './smooth-scroll-provider'
import {
  SmoothScrollWrapper,
  SmoothScrollWrapperProps,
} from './smooth-scroll-wrapper'

export interface SmoothScrollProps {
  children?: ReactNode
  options?: SmoothScrollWrapperProps['options']
}

export function SmoothScroll(props: SmoothScrollProps) {
  return (
    <SmoothScrollProvider>
      <SmoothScrollWrapper options={props.options}>
        {props.children}
      </SmoothScrollWrapper>
    </SmoothScrollProvider>
  )
}
