import {screen} from '@testing-library/react'
import Contact from '../src/components/Contact'
import {archiveLinks, externalLinks} from '../src/components/slugloopMuseumData'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('renders internal and external archive links on the back-cover page', () => {
  renderWithProviders(<Contact />)

  expect(
    screen.getByText(/the back of the notebook/i),
  ).toBeInTheDocument()

  const internalDemo = archiveLinks.demo.find((link) => link.internal)
  const internalLink = screen.getByRole('link', {name: new RegExp(internalDemo.title, 'i')})
  expect(internalLink).toHaveAttribute('href', '/map')
  expect(internalLink).not.toHaveAttribute('target')

  const githubLink = screen
    .getAllByRole('link')
    .find((link) => link.getAttribute('href') === externalLinks.githubRepo)
  expect(githubLink).toBeDefined()
  expect(githubLink).toHaveAttribute('target', '_blank')
  expect(githubLink).toHaveAttribute('rel', 'noopener')
})
