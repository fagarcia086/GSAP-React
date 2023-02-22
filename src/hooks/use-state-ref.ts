import { useCallback, useRef, useState } from 'react'

export function useStateRef<T = any>(defaultValue: T) {
  const [state, setState] = useState(defaultValue)
  const ref = useRef(state)

  const dispatch = useCallback((value: T) => {
    ref.current = typeof value === 'function' ? value(ref.current) : value
    setState(ref.current)
  }, [])

  return [state, dispatch, ref]
}
