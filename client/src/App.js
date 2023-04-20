import './App.css'
import {useEffect} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About'
import Contact from './Components/Contact'
import React, { useState } from 'react';
import SettingsContext from './SettingsContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
])

function App() {
  useEffect(() => {
    signIn()
  }, [])

  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
  });
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <RouterProvider router={router} />
    </SettingsContext.Provider>
  );
}

export default App
