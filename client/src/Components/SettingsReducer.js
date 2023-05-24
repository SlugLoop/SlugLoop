
export const INITIAL_STATE = {
    displayTime: false,
    darkMode: false,
    filter: false,
    path: true,
    showMap: true,
    displayUCSC: true,

}
export function SettingsReducer(state, action){
    switch (action.type){
        case 'SET_DISPLAY_TIME':
            return {
                ...state, 
                displayTime: !state.displayTime
            }
        case 'SET_DARK_MODE':
            return {
                ...state, 
                darkMode: !state.darkMode
            }
        case 'SET_FILTER':
            return {
                ...state, 
                filter: !state.filter
            }
        case 'SET_PATH':
            return {
                ...state,
                path: !state.path
            }
        case 'SET_SHOW_MAP':
            return {
                ...state,
                showMap: !state.showMap
            }
        case 'SET_DISPLAY_UCSC':
            return {
                ...state,
                displayUCSC: !state.displayUCSC
            }
        default: return state
    }
}

