import {
    CREATE_USER,
    FETCH_USERS_LIST,
    SELECTED_USER,
    LOGOUT_USER
} from '../constants/user'
import axios from 'axios'

export const selectedUser = data => {
    localStorage.setItem('selectedUser', JSON.stringify(data))
    return {
        type: SELECTED_USER,
        payload: data
    }
}


export const createUser = inputData => async dispatch => {
    console.log(inputData)
    try {
        const { data } = await axios.post('http://localhost:8088/users/', inputData)
        localStorage.setItem('user', JSON.stringify(data))
        dispatch(selectedUser(data))
        dispatch({ type: CREATE_USER, payload: data })
    } catch ({ error }) {
        console.log(error)
        return error
    }
}

export const fetchUsersList = () => async dispatch => {
    try {
        const { data } = await axios.get('http://localhost:8088/users/getAllUsers')
        dispatch({ type: FETCH_USERS_LIST, payload: data })
    } catch (error) {
        return error
    }
}

export const logoutUser = () => {
    localStorage.clear();
    return {
        type: LOGOUT_USER
    }
}


