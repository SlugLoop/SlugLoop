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
  const createMotionComponent = (Component = 'div') =>
    React.forwardRef(({children, ...props}, ref) => (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    ))
  const motion = (Component) => createMotionComponent(Component)
  motion.create = (Component) => createMotionComponent(Component)
  motion.div = createMotionComponent('div')

  return {
    AnimatePresence: ({children}) => <>{children}</>,
    motion,
    useReducedMotion: () => true,
  }
})
