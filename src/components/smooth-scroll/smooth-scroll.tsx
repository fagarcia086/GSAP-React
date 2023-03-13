import { ReactNode } from 'react'
import { SmoothScrollProvider } from './smooth-scroll-provider'
import {
  SmoothScrollWrapper,
  SmoothScrollWrapperProps,
} from './smooth-scroll-wrapper'

export interface SmoothScrollProps extends SmoothScrollWrapperProps {
  children?: ReactNode
}

export function SmoothScroll(props: SmoothScrollProps) {
  return (
    <SmoothScrollProvider>
      <SmoothScrollWrapper
        options={props.options}
        noInitialWrapper={props.noInitialWrapper}>
        {props.children}
      </SmoothScrollWrapper>
    </SmoothScrollProvider>
  )
}
