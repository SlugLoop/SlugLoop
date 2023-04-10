import React from 'react'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import About from '../Components/About'

test('renders About component with headings and contributors', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  )

  // Check if "About Us" heading is rendered
  const aboutUsHeading = screen.getByText('About Us')
  expect(aboutUsHeading).toBeInTheDocument()

  // Check if "Project Goals:" heading is rendered
  const projectGoalsHeading = screen.getByText('Project Goals:')
  expect(projectGoalsHeading).toBeInTheDocument()

  // Check if "Contributors:" heading is rendered
  const contributorsHeading = screen.getByText('Contributors:')
  expect(contributorsHeading).toBeInTheDocument()

  // Check if "Back to Map" button is rendered
  const backButton = screen.getByText('Back to Map')
  expect(backButton).toBeInTheDocument()
})
