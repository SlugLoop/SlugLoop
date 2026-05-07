import {screen} from '@testing-library/react'
import MyTimeline from '../src/components/TimeLine/TimeLine'
import {milestones} from '../src/components/slugloopMuseumData'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('renders the timeline milestones from archive data', () => {
  renderWithProviders(<MyTimeline />)

  expect(screen.getByText('The route from frustration to finalist.')).toBeInTheDocument()
  milestones.forEach((milestone) => {
    expect(screen.getByText(milestone.title)).toBeInTheDocument()
  })
  expect(screen.getByRole('link', {name: /launch map demo/i})).toHaveAttribute(
    'href',
    '/map',
  )
})
