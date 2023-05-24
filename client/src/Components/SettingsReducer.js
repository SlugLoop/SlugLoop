function SettingsReducer(state, action){
    switch (action.type){
        case 'SET_DISPLAY_TIME':
            return {
                ...state, 
                displayTime: !displayTime
            }
        case 'SET_DARK_MODE':
            return {
                ...state, 
                darkMode: !darkMode
            }
        case 'SET_FILTER':
            return {
                ...state, 
                filter: !filter
            }
        case 'SET_PATH':
            return {
                ...state,
                path: !path
            }
        case 'SET_SHOW_MAP':
            return {
                ...state,
                showMap: !showMap
            }
        case 'SET_DISPLAY_UCSC':
            return {
                ...state,
                displayUCSC: !displayUCSC
            }
        default: return state
    }
}

export default SettingsReducer;