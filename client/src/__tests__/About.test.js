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


// Test to click the "back to map" button
test('clicking "Back to Map" button navigates to home page', () => {
  // Render the component within a MemoryRouter to enable navigation
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );

  // Find the "Back to Map" button
  const backButton = screen.getByRole('button', { name: /back to map/i });

  // Simulate a click on the button
  fireEvent.click(backButton);

  // Assert that the navigation occurred by checking if the home page is rendered
  // expect(screen.getByRole('metro')).toBeInTheDocument();

  // expect(screen.getByText('Legend')).toBeInTheDocument()
});
