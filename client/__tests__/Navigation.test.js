import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DesktopTopBar from '../src/components/TopBar/TopBarDesktop'
import MobileTopBar from '../src/components/TopBar/TopBarMobile'
import {renderWithProviders} from '../src/test/renderWithProviders'

jest.mock('next/navigation', () => ({
  useRouter: () => ({push: jest.fn()}),
  usePathname: () => '/',
}))

test('desktop top bar exposes archive routes via folder-tab anchors', () => {
  renderWithProviders(<DesktopTopBar />)

  expect(screen.getByRole('link', {name: 'Cover'})).toHaveAttribute('href', '/')
  expect(screen.getByRole('link', {name: 'Field log'})).toHaveAttribute('href', '/journey')
  expect(screen.getByRole('link', {name: 'Crew'})).toHaveAttribute('href', '/about')
  expect(screen.getByRole('link', {name: 'Links'})).toHaveAttribute('href', '/contact')
  expect(screen.getByRole('link', {name: /open map/i})).toHaveAttribute('href', '/map')
})

test('mobile top bar opens its menu and reveals nav anchors', async () => {
  const user = userEvent.setup()
  renderWithProviders(<MobileTopBar />)

  await user.click(screen.getByRole('button', {name: /toggle navigation/i}))

  expect(screen.getByRole('link', {name: /open map/i})).toHaveAttribute('href', '/map')
  expect(screen.getByRole('link', {name: 'Field log'})).toHaveAttribute('href', '/journey')
})
