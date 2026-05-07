import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DesktopTopBar from '../src/components/TopBar/TopBarDesktop'
import MobileTopBar from '../src/components/TopBar/TopBarMobile'
import {renderWithProviders} from '../src/test/renderWithProviders'

const push = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({push}),
}))

beforeEach(() => {
  push.mockClear()
})

test('desktop top bar exposes archive routes and pushes logo navigation', async () => {
  const user = userEvent.setup()
  renderWithProviders(<DesktopTopBar />)

  expect(screen.getByRole('link', {name: 'Story'})).toHaveAttribute('href', '/')
  expect(screen.getByRole('link', {name: 'Archive'})).toHaveAttribute('href', '/timeline')
  expect(screen.getByRole('link', {name: 'Team'})).toHaveAttribute('href', '/about')
  expect(screen.getByRole('link', {name: 'Links'})).toHaveAttribute('href', '/contact')
  expect(screen.getByRole('link', {name: /open map/i})).toHaveAttribute('href', '/map')

  await user.click(screen.getByText('SlugLoop'))
  expect(push).toHaveBeenCalledWith('/')
})

test('mobile top bar opens its menu and navigates with router push', async () => {
  const user = userEvent.setup()
  renderWithProviders(<MobileTopBar />)

  await user.click(screen.getByRole('button', {name: /toggle navigation/i}))
  await user.click(screen.getByRole('button', {name: /open map/i}))

  expect(push).toHaveBeenCalledWith('/map')
})
