import {screen} from '@testing-library/react'
import Journey from '../src/components/Journey/Journey'
import {journeyEntries} from '../src/components/slugloopMuseumData'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('journey field log renders all entries in order', () => {
  renderWithProviders(<Journey />)

  expect(
    screen.getByText(/from a reddit thread/i),
  ).toBeInTheDocument()

  journeyEntries.forEach((entry) => {
    if (entry.id === 'top-10') {
      expect(
        screen.getByRole('heading', {name: /top 10 global finalist/i}),
      ).toBeInTheDocument()
    } else {
      expect(screen.getByText(entry.title)).toBeInTheDocument()
    }
  })

  expect(
    screen.getByRole('link', {name: /open the map/i}),
  ).toHaveAttribute('href', '/map')
})
