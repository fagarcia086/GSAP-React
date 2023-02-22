import { createContext, Dispatch, SetStateAction } from 'react'

export interface ISmoothScrollContext {
  isSmootherReady: boolean
  setIsSmootherReady: Dispatch<SetStateAction<boolean>>
}

export const SmoothScrollContext = createContext<
  ISmoothScrollContext | undefined
>(undefined)
