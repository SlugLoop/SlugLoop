import {getVisibleBuses, mergeUpdatedBuses, formatStopName} from '../src/lib/mapHelpers'

jest.mock('../src/components/helper', () => ({
  isBusUpdatedWithinPast30Minutes: (timestamp) => timestamp?.recent,
}))

test('merges updated bus records by id', () => {
  expect(
    mergeUpdatedBuses(
      [
        {id: '1', route: 'LOOP', heading: 10},
        {id: '2', route: '3A', heading: 20},
      ],
      [{id: '2', route: '3A', heading: 90}],
    ),
  ).toEqual([
    {id: '1', route: 'LOOP', heading: 10},
    {id: '2', route: '3A', heading: 90},
  ])
})

test('filters buses by route and recency', () => {
  const visible = getVisibleBuses({
    buses: [
      {id: '1', route: 'LOOP', lastPing: {recent: true}},
      {id: '2', route: 'SPECIAL', lastPing: {recent: false}},
    ],
    metroBuses: [{id: '3', route: '3A', lastPing: {recent: true}}],
    filter: true,
    selectedRoute: ['LOOP', '3A'],
  })

  expect(visible.map((bus) => bus.id)).toEqual(['1', '3'])
  expect(formatStopName('scienceHill')).toBe('ScienceHill')
})
