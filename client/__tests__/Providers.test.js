import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useContext} from 'react'
import AppContext from '../src/appContext'
import AppProvider from '../src/appProvider'
import {RouteContext, RouteProvider} from '../src/Route'

function ThemeProbe() {
  const {darkMode, toggleDarkMode} = useContext(AppContext)
  return (
    <button type="button" onClick={toggleDarkMode}>
      {darkMode ? 'dark' : 'light'}
    </button>
  )
}

function RouteProbe() {
  const [selectedRoute] = useContext(RouteContext)
  return <div>{selectedRoute.join('|')}</div>
}

test('persists theme mode changes', async () => {
  window.localStorage.setItem('slugloop-theme-mode', 'dark')
  const user = userEvent.setup()

  render(
    <AppProvider>
      <ThemeProbe />
    </AppProvider>,
  )

  expect(await screen.findByRole('button', {name: 'dark'})).toBeInTheDocument()
  await user.click(screen.getByRole('button', {name: 'dark'}))

  await waitFor(() => {
    expect(window.localStorage.getItem('slugloop-theme-mode')).toBe('light')
  })
})

test('provides the default route filter list', () => {
  render(
    <RouteProvider>
      <RouteProbe />
    </RouteProvider>,
  )

  expect(screen.getByText(/LOOP/)).toHaveTextContent(
    'LOOP|UPPER CAMPUS|LOOP OUT OF SERVICE AT BARN THEATER|EAST NIGHT CORE|OUT OF SERVICE/SORRY|SPECIAL',
  )
})
