import {screen} from '@testing-library/react'
import TeamPage from '../src/components/About/TeamPage'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('renders the crew page with each team member', () => {
  renderWithProviders(<TeamPage />)

  expect(screen.getByText(/four engineers/i)).toBeInTheDocument()
  expect(screen.getByText(/bill zhang/i)).toBeInTheDocument()
  expect(screen.getByText(/alex liu/i)).toBeInTheDocument()
  expect(screen.getByText(/annie liu/i)).toBeInTheDocument()
  expect(screen.getByText(/nicholas szwed/i)).toBeInTheDocument()
  expect(screen.getByText(/built with help from/i)).toBeInTheDocument()
})
