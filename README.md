# GSAP React

![npm](https://img.shields.io/npm/v/@chacra/gsap-react)

## Collection of React utilities and hooks for GSAP.

---

### Installation

- Requires gsap version 3.11.0 or newer

###### npm

```shell
npm install gsap-react gsap
```

###### yarn

```shell
yarn add gsap-react gsap
```

###### pnpm

```shell
pnpm add gsap-react gsap
```

## Hooks

#### `useGsapContext`

Memoises a GSAP Context instance.

### Usage:

```tsx
import { useGsapContext } from 'gsap-react'
import { useLayoutEffect, useRef } from 'react'

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const ctx = useGsapContext(ref)

  useLayoutEffect(() => {
    ctx.add(() => {
      gsap.to('.box', {
        x: 200,
        stagger: 0.1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="app" ref={ref}>
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
      <div className="box">Box 3</div>
    </div>
  )
}
```

[See demo](https://codepen.io/rhernando/pen/poVXMzO/2f8fddc88612bba7c19c017acb56ff27)

#### `useGsapEffect`

Use register effect.

### Usage:

```tsx
import { useGsapEffect } from 'gsap-react'
import { useRef } from 'react'

function App() {
  const box = useRef()
  const animation = useGsapEffect(box, 'spin')

  return <Box ref={box}>Hello</Box>
}
```

#### `useSelector`

Query selector

### Usage:

```tsx
import { gsap } from 'gsap'
import { useSelector } from 'gsap-react'
import { useLayoutEffect } from 'react'

function App() {
  const [q, ref] = useSelector<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.to(q('.box'), { x: 200 })
  }, [])

  return (
    <div ref={ref}>
      <div className="box">Box 1</div>
    </div>
  )
}
```

#### `useStateRef`

This hook helps solve the problem of accessing stale values in your callbacks. It works exactly like useState, but returns a third value, a ref with the current state.

### Usage:

```tsx
const [count, setCount, countRef] = useStateRef(5)
const [gsapCount, setGsapCount] = useState(0)

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.box', {
      x: 200,
      repeat: -1,
      onRepeat: () => setGsapCount(countRef.current),
    })
  }, app)
  return () => ctx.revert()
}, [])
```

[See demo](https://codepen.io/GreenSock/pen/f7a9589f001a66076d7e03ef61859cfd)

#### `useMatchMedia`

GSAP MatchMedia

### Usage:

```tsx
import { gsap } from 'gsap'
import { useMatchMedia } from 'gsap-react'
import { useLayoutEffect, useRef } from 'react'

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const mm = useMatchMedia(ref)

  useLayoutEffect(() => {
    mm.add('(min-width: 768px)', () => {
      gsap.to(q('.box'), { x: 200 })
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={ref}>
      <div className="box">Box 1</div>
    </div>
  )
}
```

#### `useMergeRefs`

Merge multiple refs, useful especially when using with forwardRef.

### Usage:

```tsx
import { gsap } from 'gsap'
import { useMergeRefs } from 'gsap-react'
import { forwardRef, useLayoutEffect, useRef } from 'react'

const Button = forwardRef(({ children, ...props }, ref) => {
  const internalRef = useRef<HTMLButtonElement>(null)
  const refs = useMergeRefs(ref, internalRef)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {}, internalRef)
  }, [])

  return (
    <button ref={refs} {...props}>
      <span className="button-text">{children}</span>
    </button>
  )
})
```

### `useIsomorphicLayoutEffect`

Server side rendering (SSR)

### Usage:

```tsx
import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect } from 'gsap-react'
import { useRef } from 'react'

function App() {
  const app = useRef()

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.box', { opacity: 0 })
    }, app)
    return () => ctx.revert()
  }, [])

  return (
    <div className="app" ref={app}>
      <div className="box">Box 1</div>
    </div>
  )
}
```

For more information, visit [GSAP Hooks](https://greensock.com/react-advanced/#hooks).

## Components

### `SmoothScroll`

This component uses [GSAP `ScrollSmoother`](https://greensock.com/scrollsmoother/) that applies scroll smoothing functionality and easily create elements with different scrolling speed or parallax effects, [see docs](https://greensock.com/docs/v3/Plugins/ScrollSmoother). Under the hood it register the required plugins `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)`

> 🔵 NOTE: This component needs a [Club GreenSock](https://greensock.com/club/) membership.

### Usage:

```tsx
import { SmoothScroll } from 'gsap-react'

function App() {
  return (
    <SmoothScroll>
      <div className="box" data-speed={0.6}>
        Box 1
      </div>
      <div className="box" data-speed={0.8}>
        Box 2
      </div>
      <div className="box" data-speed={1.2}>
        Box 3
      </div>
    </SmoothScroll>
  )
}
```

It accepts `options` props for customizing the `ScrollSmoother`. You can also disable the initial wrapper by setting the props `noInitialWrapper` to `true` if you plan to create your own wrapper element, just make sure to provide `wrapper` and `content` selector inside the `options` props. default is `#smooth-wrapper` and `#smooth-content`.

### Usage with NextJS 13.1 app dir:

First create a `AppWrapper.tsx` and add "use client" directive at the top.

```tsx
'use client'

import { SmoothScroll } from 'gsap-react'

interface AppWrapperProps {
  children?: React.ReactNode
}

function AppWrapper({ children }: AppWrapperProps) {
  return <SmoothScroll>{children}</SmoothScroll>
}
```

And import it in your root layout file.

```tsx
function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
```

### Usage along side with `ScrollTrigger`:

You may encounter some issues when you have a component that uses `ScrollTrigger`. To fix this we need to wait for `ScrollSmoother` plugin to initialize, we can use the `useSmoothScroll` hook to get the state of the smoother.

```tsx
'use client'

import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect, useSmoothScroll } from 'gsap-react'
import { useRef } from 'react'

function MyComponent() {
  const { smoother } = useSmoothScroll()

  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!smoother) return

    let ctx = gsap.context(() => {
      gsap.to('.box', {
        scale: 2,
        scrollTrigger: {
          trigger: ref.current,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [smoother])

  return (
    <div ref={ref}>
      <div className="box" />
    </div>
  )
}
```

Don't forget the 'use client' directive when using app dir in NextJS.

### Contributing

Accepting PRs 💜
