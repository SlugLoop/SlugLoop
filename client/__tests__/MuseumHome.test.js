import {screen} from '@testing-library/react'
import MuseumHome from '../src/components/Landing/MuseumHome'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('renders the field-notebook home page', () => {
  renderWithProviders(<MuseumHome />)

  expect(
    screen.getByText(/field notes from a hackathon/i),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('link', {name: /read the field log/i}),
  ).toHaveAttribute('href', '/journey')
  expect(
    screen.getByRole('link', {name: /open the demo map/i}),
  ).toHaveAttribute('href', '/map')
})
