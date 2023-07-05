import axios from 'axios'
import {DeleteTodolist} from '../stories/todolists-api.stories';

// const settings = {
//     withCredentials: true,
//     headers: {
//         // Не забываем заменить API-KEY на собственный
//         'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd',
//     },
// }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd',
    },
})


type todolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}

// type CreateTodolistResponseType = {
//     resultCode: number
//     data: {
//         item: todolistType
//     },
//     messages: string[],
//     fieldsErrors: string[]
// }

type DeleteTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {}
}

export type ResponseType<D> = {
    resultCode: number,
    messages: string[],
    fieldErrors: string[]
    data: D
}




export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise1 = instance.put<ResponseType<{}>>(
            `todo-lists/${todolistId}`,
            { title: title },
        )
        return promise1
    },
    deleteTodolist(todolistId: string) {
        const promise2 = instance.delete<ResponseType<{D: []}>>(
            `todo-lists/${todolistId}`,
        )
        return promise2
    },
    createTodolist(title: string) {
        const promise3 = instance.post<ResponseType<{ D: todolistType}>>(
            'todo-lists',
            {title: title},
        )
        return promise3
    },
    getTodolist() {
        const promise4 = instance.get<todolistType[]>(
            'todo-lists',
        )
        return promise4
    }
}

