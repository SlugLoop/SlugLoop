import {render} from '@testing-library/react'
import AppContext from '../appContext'
import {RouteProvider} from '../Route'

export function renderWithProviders(ui, {darkMode = true} = {}) {
  document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'

  const appContextValue = {
    darkMode,
    setDarkMode: jest.fn(),
    toggleDarkMode: jest.fn(),
  }

  return render(
    <AppContext.Provider value={appContextValue}>
      <RouteProvider>{ui}</RouteProvider>
    </AppContext.Provider>,
  )
}
