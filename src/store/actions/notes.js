import {
    CREATE_NOTE,
    EDIT_NOTE,
    FETCH_NOTES,
    SELECTED_NOTE,
    UNSELECT_NOTE
} from '../constants/notes';
import { store } from '../store'
import axios from 'axios';

var currentUserId = store.getState ? store.getState().user.selectedUser : JSON.parse(localStorage.getItem('selectedUser')) || {}
// var currentUserId = store.getState().user.currentUser.id
// console.log(store.getState ? store.getState().user.currentUser.id : {})

export const createNote = (inputData, id) => async dispatch => {
    // console.log(store.getState ? store.getState().user.currentUser : {})
    console.log(id)
    try {
        const { data } = await axios.post('http://localhost:8088/notes/', { userId: id, ...inputData })
        dispatch({
            type: CREATE_NOTE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
};

export const editNote = (inputData, id) => async dispatch => {
    try {
        const { data } = await axios.post('http://localhost:8088/notes/',
            { userId: id, ...inputData })
        dispatch({
            type: EDIT_NOTE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
};


export const fetchNotes = (id) => async dispatch => {
    // console.log(id)
    try {
        const { data } = await axios.get(`http://localhost:8088/notes/getAllNotes/${id}`)
        console.log(data)
        dispatch({
            type: FETCH_NOTES,
            payload: data
        })

    } catch (error) {
        console.log({ error })
    }
}

export const selectedNote = (data) => ({
    type: SELECTED_NOTE,
    payload: data
})

export const unSelectNote = () => ({
    type: UNSELECT_NOTE
})