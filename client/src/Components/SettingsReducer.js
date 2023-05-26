
export const INITIAL_STATE = {
    displayTime: localStorage.getItem('displayTime')? JSON.parse(localStorage.getItem('displayTime')):false,
    darkMode: localStorage.getItem('darkMode')? JSON.parse(localStorage.getItem('darkMode')):false,
    filter: localStorage.getItem('filter')? JSON.parse(localStorage.getItem('filter')):false,
    path: localStorage.getItem('path')? JSON.parse(localStorage.getItem('path')):true,
    showMap: localStorage.getItem('showMap')? JSON.parse(localStorage.getItem('showMap')):true,
    displayUCSC: localStorage.getItem('displayUCSC')? JSON.parse(localStorage.getItem('displayUCSC')):true,

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
        case 'SET_PATH':
            localStorage.setItem('path', JSON.stringify(!state.path))
            return {
                ...state,
                path: !state.path
            }
        case 'SET_SHOW_MAP':
            localStorage.setItem('showMap', JSON.stringify(!state.showMap))
            return {
                ...state,
                showMap: !state.showMap
            }
        case 'SET_DISPLAY_UCSC':
            localStorage.setItem('displayUCSC', JSON.stringify(!state.displayUCSC))
            return {
                ...state,
                displayUCSC: !state.displayUCSC
            }
        default: return state
    }
}

