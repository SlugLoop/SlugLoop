import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsDrawer from '../src/components/SettingsDrawer'
import {renderWithProviders} from '../src/test/renderWithProviders'

const push = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({push}),
}))

beforeEach(() => {
  push.mockClear()
})

test('controls map settings and route navigation', async () => {
  const user = userEvent.setup()
  const toggleDisplayTime = jest.fn()
  const handleFilterToggle = jest.fn()

  renderWithProviders(
    <SettingsDrawer
      filter
      displayTime
      toggleDisplayTime={toggleDisplayTime}
      handleFilterToggle={handleFilterToggle}
      darkMode
    />,
  )

  await user.click(screen.getByRole('button', {name: /menu/i}))
  await user.click(screen.getByText(/hide time/i))
  expect(toggleDisplayTime).toHaveBeenCalledTimes(1)

  await user.click(screen.getByText(/show past buses/i))
  expect(handleFilterToggle).toHaveBeenCalledTimes(1)

  await user.click(screen.getByText(/^field log$/i))
  expect(push).toHaveBeenCalledWith('/journey')
})
