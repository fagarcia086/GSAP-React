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
  const [smoother, setSmoother] = useState(defaultValue?.smoother ?? null)

  const value = useMemo(() => ({ smoother, setSmoother }), [smoother])

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
