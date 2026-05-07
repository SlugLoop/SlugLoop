import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ThemeProvider} from '@mui/material/styles'
import About from '../Components/About/AboutUs'
import {themeOptions} from '../Components/Theme/theme'

test('renders team and credits archive page', () => {
  render(
    <ThemeProvider theme={themeOptions(true)}>
      <About />
    </ThemeProvider>,
  )

  expect(screen.getByText('The people behind the artifact.')).toBeInTheDocument()
  expect(screen.getByText('Bill Zhang')).toBeInTheDocument()
  expect(screen.getByText('What this proves')).toBeInTheDocument()
})
