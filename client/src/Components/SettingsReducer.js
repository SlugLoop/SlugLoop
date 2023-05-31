
export const INITIAL_STATE = {
    displayTime: localStorage.getItem('displayTime')? JSON.parse(localStorage.getItem('displayTime')):false,
    darkMode: localStorage.getItem('darkMode')? JSON.parse(localStorage.getItem('darkMode')):false,
    filter: localStorage.getItem('filter')? JSON.parse(localStorage.getItem('filter')):false,
    selectedRoute: localStorage.getItem('selectedRoute')?JSON.parse(localStorage.getItem('selectedRoute')):
    ['10', '15', '18', '19', '20', 'LOOP',
    'UPPER CAMPUS',
    'LOOP OUT OF SERVICE AT BARN THEATER',
    'OUT OF SERVICE/SORRY',
    'SPECIAL',]
   

}
export function SettingsReducer(state, action){
    switch (action.type){
        case 'SET_DISPLAY_TIME':
            localStorage.setItem('displayTime', JSON.stringify(!state.displayTime))
            return {
                ...state, 
                displayTime: !state.displayTime
            }
        case 'SET_DARK_MODE':
            localStorage.setItem('darkMode', JSON.stringify(!state.darkMode))
            return {
                ...state, 
                darkMode: !state.darkMode
            }
        case 'SET_FILTER':
            localStorage.setItem('filter', JSON.stringify(!state.filter))
            return {
                ...state, 
                filter: !state.filter
            }
        case 'DELETE_ROUTE':
            localStorage.setItem('selectedRoute', JSON.stringify(state.selectedRoute.filter((r) => r !== action.deletedRoute)))
            return {
                ...state,
                selectedRoute: state.selectedRoute.filter((r) => r !== action.deletedRoute)
            }
        case 'ADD_ROUTE':
            localStorage.setItem('selectedRoute', JSON.stringify([...state.selectedRoute, action.addedRoute]))
            return {
                ...state,
                selectedRoute:[...state.selectedRoute, action.addedRoute]
            }
        case 'CLEAR_ROUTE':
            localStorage.setItem('selectedRoute', JSON.stringify([]))
            return {
                ...state,
                selectedRoute:[]
            }
        default: return state
    }
}

