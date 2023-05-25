import { createContext, Dispatch, SetStateAction } from 'react'

export interface ISmoothScrollContext {
  smoother: ScrollSmoother | null
  setSmoother: Dispatch<SetStateAction<ScrollSmoother | null>>
}

export const SmoothScrollContext = createContext<
  ISmoothScrollContext | undefined
>(undefined)
