const SET_THEME_ID = 'SET_THEME_ID'

const initState = {
    themeId: 1,
}

export const themeReducer = (state = initState, action: changeThemeIdType): {themeId: number} => { // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID': {
            return {themeId: action.id}
        }
        default:
            return state
    }
}




type changeThemeIdType = {
    type: typeof SET_THEME_ID
    id: number
}

export const changeThemeId = (id: number): changeThemeIdType => {
    return {
        type: 'SET_THEME_ID',
        id
    } as const
} // fix any
