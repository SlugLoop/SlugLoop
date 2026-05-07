import {act, screen, waitFor} from '@testing-library/react'
import MapComponent from '../src/components/MapComponent'
import {
  getAllBuses,
  getAllMetroBuses,
  getBusEtas,
  getUpdatedBuses,
  getUpdatedMetroBuses,
} from '../src/lib/busData'
import {renderWithProviders} from '../src/test/renderWithProviders'

jest.mock('google-maps-react-markers', () => ({
  __esModule: true,
  default: ({children}) => <div data-testid="google-map">{children}</div>,
}))

jest.mock('../src/components/MapMarker', () => ({
  __esModule: true,
  default: ({fleetId, route}) => (
    <div data-testid={`bus-${fleetId}`}>
      {fleetId} {route}
    </div>
  ),
}))

jest.mock('../src/components/StopMarkers', () => ({
  __esModule: true,
  default: ({name, eta}) => (
    <div data-testid={`stop-${name}`}>
      {name} {eta ?? 'no eta'}
    </div>
  ),
}))

jest.mock('../src/lib/busData', () => ({
  getAllBuses: jest.fn(),
  getUpdatedBuses: jest.fn(),
  getAllMetroBuses: jest.fn(),
  getUpdatedMetroBuses: jest.fn(),
  getBusEtas: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({push: jest.fn()}),
}))

function recentTimestamp() {
  return {
    seconds: Math.floor(Date.now() / 1000),
    toMillis: () => Date.now(),
  }
}

beforeEach(() => {
  jest.useFakeTimers()
  jest.clearAllMocks()
  getAllBuses.mockResolvedValue([
    {
      id: 'loop-1',
      fleetId: '101',
      route: 'LOOP',
      lastPing: recentTimestamp(),
      lastLatitude: '36.99',
      lastLongitude: '-122.06',
      direction: 'CW',
      heading: 20,
    },
  ])
  getAllMetroBuses.mockResolvedValue([])
  getUpdatedBuses.mockResolvedValue([
    {
      id: 'loop-1',
      fleetId: '101',
      route: 'LOOP',
      lastPing: recentTimestamp(),
      lastLatitude: '36.99',
      lastLongitude: '-122.06',
      direction: 'CW',
      heading: 90,
    },
  ])
  getUpdatedMetroBuses.mockResolvedValue([])
  getBusEtas.mockResolvedValue({cw: {}, ccw: {}})
})

afterEach(() => {
  jest.clearAllTimers()
  jest.useRealTimers()
})

test('loads map data and polls for updates', async () => {
  renderWithProviders(<MapComponent center={{lat: 36.99, lng: -122.06}} zoom={15} />)

  expect(screen.getByTestId('map')).toBeInTheDocument()
  expect(screen.getByTestId('google-map')).toBeInTheDocument()

  await waitFor(() => {
    expect(getAllBuses).toHaveBeenCalledTimes(1)
    expect(getAllMetroBuses).toHaveBeenCalledTimes(1)
    expect(getBusEtas).toHaveBeenCalledTimes(1)
  })
  expect(await screen.findByTestId('bus-101')).toHaveTextContent('LOOP')

  act(() => {
    jest.advanceTimersByTime(5000)
  })

  await waitFor(() => {
    expect(getUpdatedBuses).toHaveBeenCalledTimes(1)
  })
})

test('pauses and resumes polling on visibility changes', async () => {
  renderWithProviders(<MapComponent center={{lat: 36.99, lng: -122.06}} zoom={15} />)

  await waitFor(() => {
    expect(getAllBuses).toHaveBeenCalledTimes(1)
  })

  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value: 'visible',
  })

  act(() => {
    document.dispatchEvent(new Event('visibilitychange'))
  })

  await waitFor(() => {
    expect(getUpdatedBuses).toHaveBeenCalledTimes(1)
    expect(getUpdatedMetroBuses).toHaveBeenCalledTimes(1)
    expect(getBusEtas).toHaveBeenCalledTimes(2)
  })
})

test('shows an empty-state warning when no selected route has visible buses', async () => {
  getAllBuses.mockResolvedValue([])
  getAllMetroBuses.mockResolvedValue([])

  renderWithProviders(<MapComponent center={{lat: 36.99, lng: -122.06}} zoom={15} />)

  expect(
    await screen.findByText(/no recent vehicles match the selected routes/i),
  ).toBeInTheDocument()
})
