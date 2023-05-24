import React, {createContext, useReducer } from 'react'
import SettingsReducer from './SettingsReducer'
const SettingsContext = createContext();
const SettingsDispatchContext = createContext();
export default SettingsContext