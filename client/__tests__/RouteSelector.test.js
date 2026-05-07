import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RouteSelector from '../src/components/RouteSelector'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('toggles loop and metro route filters', async () => {
  const user = userEvent.setup()
  renderWithProviders(<RouteSelector />)

  await user.click(screen.getByRole('button', {name: /bus route filter/i}))
  expect(screen.getByText(/bus routes/i)).toBeInTheDocument()

  await user.click(screen.getByText(/^loop$/i))
  const loopCheckbox = screen.getAllByRole('checkbox')[0]
  expect(loopCheckbox).toBeChecked()

  await user.click(screen.getByText('LOOP'))
  expect(loopCheckbox).not.toBeChecked()

  await user.click(screen.getByText(/^metro$/i))
  expect(screen.getByText('3A')).toBeInTheDocument()
  const metroCheckbox = screen.getAllByRole('checkbox')[0]
  expect(metroCheckbox).not.toBeChecked()

  await user.click(screen.getByText('3A'))
  expect(metroCheckbox).toBeChecked()

  await user.click(screen.getByText(/clear routes/i))
  expect(metroCheckbox).not.toBeChecked()
})
