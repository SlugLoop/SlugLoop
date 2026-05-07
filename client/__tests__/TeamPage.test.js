import {screen} from '@testing-library/react'
import TeamPage from '../src/components/About/TeamPage'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('renders team and credits archive page', () => {
  renderWithProviders(<TeamPage />)

  expect(screen.getByText('The people behind the artifact.')).toBeInTheDocument()
  expect(screen.getByText('Bill Zhang')).toBeInTheDocument()
  expect(screen.getByText('Alex Liu')).toBeInTheDocument()
  expect(screen.getByText('Annie Liu')).toBeInTheDocument()
  expect(screen.getByText('Nicholas Szwed')).toBeInTheDocument()
  expect(screen.getByText('What this proves')).toBeInTheDocument()
})
