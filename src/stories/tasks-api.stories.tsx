import {useEffect, useState} from 'react';
import axios from 'axios';
import {GetTaskType, ResponseTaskType, tasksAPI, taskType} from '../api/tasks-api';
import taskStories from './Task.stories';

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd'
//     }
// }

export default {
    title: 'Tasks API'
}


const todolistId  = "b3321670-d1d9-48a5-b98b-59e6d737d895"
const taskId = ""

export const GetTasks = () => {
    const [state, setState] = useState<GetTaskType | null>(null)
    useEffect( () => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<ResponseTaskType<{D: taskType}> | null>(null)
    useEffect( () => {
        tasksAPI.createTask(todolistId, 'Tasks Title')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<ResponseTaskType<{D : {}}> | null>(null)
    useEffect( () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<ResponseTaskType<{ D: {item: taskType} }> | null>(null)
    useEffect( () => {
        tasksAPI.updateTask(todolistId, taskId, 'Super Title')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}