
import Settings from './Settings.json'
export const INITIAL_STATE = Settings

export function SettingsReducer(state, action){
    switch (action.type){
        case 'SET_DISPLAY_TIME':
            state.displayTime = !state.displayTime
            localStorage.setItem('settings', JSON.stringify(state))
            return {
                ...state, 
                displayTime: state.displayTime
            }
        case 'SET_DARK_MODE':
            state.darkMode = !state.darkMode
            localStorage.setItem('settings', JSON.stringify(state))
            return {
                ...state, 
                darkMode: state.darkMode
            }
        case 'SET_FILTER':
            state.filter = !state.filter
            localStorage.setItem('settings', JSON.stringify(state))
            return {
                ...state, 
                filter: state.filter
            }
        case 'DELETE_ROUTE':
            state.selectedRoute = state.selectedRoute.filter((r) => r !== action.deletedRoute)
            localStorage.setItem('settings', JSON.stringify(state))
            return {
                ...state,
                selectedRoute: state.selectedRoute
            }
        case 'ADD_ROUTE':
            state.selectedRoute = [...state.selectedRoute, action.addedRoute]
            localStorage.setItem('settings', JSON.stringify(state))
            return {
                ...state,
                selectedRoute:state.selectedRoute
            }
        case 'CLEAR_ROUTE':
            state.selectedRoute = []
            localStorage.setItem('settings', JSON.stringify(state))
            return {
                ...state,
                selectedRoute:[]
            }
        default: return state
    }
}

