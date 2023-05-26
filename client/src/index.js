import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {ThemeProvider} from '@mui/material/styles'
import {themeOptions} from './Components/Theme/theme'
import {inject} from '@vercel/analytics'
import {register} from './serviceWorkerRegistration'

import AppContext from './appContext'
import AppProvider from './appProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
inject()
root.render(
  <AppProvider>
    <AppContext.Consumer>
      {({darkMode}) => (
        <ThemeProvider theme={themeOptions(darkMode)}>
          <App />
        </ThemeProvider>
      )}
    </AppContext.Consumer>
  </AppProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
