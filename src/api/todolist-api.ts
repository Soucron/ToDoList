import axios from 'axios'

// const settings = {
//     withCredentials: true,
//     headers: {
//
//         'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd',
//     },
// }

//export type CreateTodolistResponseType = {
//     resultCode: number
//     data: {
//         item: todolistType
//     },
//     messages: string[],
//     fieldsErrors: string[]
// }

// export type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
//     data: {}
// }

// export type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: {}
// }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd',
    },
})


export type TodolistResponseType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}



export type ResponseType<D> = {
    resultCode: number,
    messages: string[],
    fieldErrors: string[],
    data: D
}




export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{D: {}}>>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{ D: {} }>>(
            `todo-lists/${todolistId}`,
        )
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ D: {item: TodolistResponseType }}>>(
            'todo-lists',
            {title: title},
        )
    },
    getTodolist() {
        return instance.get<TodolistResponseType[]>(
            'todo-lists',
        )
    }
}

