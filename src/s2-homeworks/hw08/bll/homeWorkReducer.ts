import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name

            switch (action.payload) {
                case "up" : {
                    return  [...state.sort((a, b) => b.age - a.age)]
                }
                case "down" : {
                    return [...state.sort((a, b) => a.age - b.age)]
                }
                default: {
                    return state
                }
            }
        }
        case 'check': {
            return state.filter(( el => el.age >= 18)).sort((a,b) => a.age - b.age)// need to fix
        }
        default:
            return state
    }
}



