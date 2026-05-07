import {screen} from '@testing-library/react'
import Contact from '../src/components/Contact'
import {resourceLinks} from '../src/components/slugloopMuseumData'
import {renderWithProviders} from '../src/test/renderWithProviders'

test('renders internal and external archive links', () => {
  renderWithProviders(<Contact />)

  expect(screen.getByText('Browse the SlugLoop archive.')).toBeInTheDocument()
  expect(screen.getByText('Open the preserved map')).toBeInTheDocument()

  const buttons = screen.getAllByRole('link', {name: /open/i})
  const internalButton = buttons.find((button) => button.getAttribute('href') === '/map')
  expect(internalButton).toBeInTheDocument()
  expect(internalButton).not.toHaveAttribute('target')

  const githubLink = resourceLinks.find((link) => link.label === 'GitHub repository')
  const externalButton = buttons.find(
    (button) => button.getAttribute('href') === githubLink.href,
  )
  expect(externalButton).toHaveAttribute('target', '_blank')
  expect(externalButton).toHaveAttribute('rel', 'noopener')
})
