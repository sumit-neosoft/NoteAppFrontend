import {
    CREATE_USER,
    FETCH_USERS_LIST,
    SELECTED_USER,
    LOGOUT_USER
} from '../constants/user'


const loggedInuser = JSON.parse(localStorage.getItem('user'))
const selectedUser = JSON.parse(localStorage.getItem('selectedUser')) || {}
const INITIAL_STATE = {
    currentUser: loggedInuser || {},
    usersList: [],
    selectedUser: selectedUser
}

export const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_USER:
            return { ...state, currentUser: action.payload }
        case FETCH_USERS_LIST:
            return {
                ...state,
                usersList: action.payload
            }
        case SELECTED_USER:
            return {
                ...state,
                selectedUser: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: {}
            }
        default: return state
    }
}