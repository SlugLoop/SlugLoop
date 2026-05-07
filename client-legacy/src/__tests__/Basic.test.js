import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {screen} from '@testing-library/react'
import {ThemeProvider} from '@mui/material/styles'
import MuseumHome from '../Components/Landing/MuseumHome'
import {themeOptions} from '../Components/Theme/theme'

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

test('renders the museum homepage', () => {
  render(
    <ThemeProvider theme={themeOptions(true)}>
      <MuseumHome />
    </ThemeProvider>,
  )
  expect(
    screen.getByText(/student-built bus tracker that made UCSC move differently/i),
  ).toBeInTheDocument()
  expect(screen.getByRole('link', {name: /open the map artifact/i})).toHaveAttribute(
    'href',
    '/map',
  )
})
