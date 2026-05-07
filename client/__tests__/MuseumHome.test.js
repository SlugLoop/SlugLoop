import {screen} from '@testing-library/react'
import MuseumHome from '../src/components/Landing/MuseumHome'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('renders the museum homepage', () => {
  renderWithProviders(<MuseumHome />)

  expect(
    screen.getByText(/student-built bus tracker that made UCSC move differently/i),
  ).toBeInTheDocument()
  expect(screen.getByRole('link', {name: /open the map artifact/i})).toHaveAttribute(
    'href',
    '/map',
  )
})
