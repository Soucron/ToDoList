import React, {useEffect, useState} from 'react'
// import axios from 'axios';
import {ResponseType, todolistAPI, todolistType} from '../api/todolist-api';

export default {
    title: 'Todolist API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd'
    }
}

const todolistId = "b3321670-d1d9-48a5-b98b-59e6d737d895"
export const GetTodolists = () => {
    const [state, setState] = useState<todolistType[] | null>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<ResponseType<{ D: {item: todolistType }}> | null>(null)
    useEffect(() => {
        todolistAPI.createTodolist('First')
            .then((res) => {
                    setState(res.data)
                })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<ResponseType<{ D: {} }> | null>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<ResponseType<{D: {}}>| null>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'Third')
            .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
