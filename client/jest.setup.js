import '@testing-library/jest-dom'

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
})

Object.defineProperty(window.navigator, 'serviceWorker', {
  configurable: true,
  value: {
    register: jest.fn(() => Promise.resolve({})),
    ready: Promise.resolve({unregister: jest.fn()}),
  },
})

jest.mock('framer-motion', () => {
  const React = require('react')
  const componentCache = new Map()
  const createMotionComponent = (Component) => {
    const key = typeof Component === 'string' ? Component : null
    if (key && componentCache.has(key)) return componentCache.get(key)
    const Wrapped = React.forwardRef(function MotionMock(
      {
        children,
        // strip framer-only props that React would warn about
        initial,
        animate,
        exit,
        transition,
        whileInView,
        whileHover,
        whileTap,
        whileFocus,
        whileDrag,
        viewport,
        variants,
        layout,
        layoutId,
        custom,
        ...props
      },
      ref,
    ) {
      const Tag = Component ?? 'div'
      return React.createElement(Tag, {ref, ...props}, children)
    })
    if (key) componentCache.set(key, Wrapped)
    return Wrapped
  }
  const motionFn = (Component) => createMotionComponent(Component)
  motionFn.create = (Component) => createMotionComponent(Component)

  const motion = new Proxy(motionFn, {
    get(target, prop) {
      if (prop in target) return target[prop]
      if (typeof prop === 'string') return createMotionComponent(prop)
      return undefined
    },
  })

  return {
    AnimatePresence: ({children}) => <>{children}</>,
    motion,
    useReducedMotion: () => true,
  }
})
