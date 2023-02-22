import { ReactNode, useMemo, useState } from 'react'
import {
  ISmoothScrollContext,
  SmoothScrollContext,
} from './smooth-scroll-context'

export interface SmoothScrollProviderProps {
  children?: ReactNode
  defaultValue?: Partial<ISmoothScrollContext>
}

export function SmoothScrollProvider({
  children,
  defaultValue,
}: SmoothScrollProviderProps) {
  const [isSmootherReady, setIsSmootherReady] = useState(
    defaultValue?.isSmootherReady ?? false
  )

  const value = useMemo(
    () => ({ isSmootherReady, setIsSmootherReady }),
    [isSmootherReady]
  )

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
