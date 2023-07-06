import axios from 'axios';

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd',
//     },
// }

// export type CreateTaskType = {
//     messages: string[],
//     resultCode: number,
//     fieldErrors: string[],
//     data: {
//         item: taskType
//     }
// }

// export type DeleteTaskType = {
//     messages: string[],
//     resultCode: number,
//     fieldErrors: string[],
//     data: {}
// }

// export type UpdateTaskTitle = {
//     messages: string[],
//     resultCode: number,
//     fieldErrors: string[],
//     data: {
//         item: taskType
//     }
// }
//

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '8785f64a-9272-49cb-9d2b-1b0e4ed880cd',
    }
})


export type taskType = {
    addedData: string,
    deadline: null,
    description: null,
    id: string,
    order: number,
    priority: number,
    startDate: null,
    status: number,
    title: string,
    todolistId: string
}

export type GetTaskType = {
    error: null,
    items: taskType[],
    totalCount: 5
}

export type ResponseTaskType<D> = {
    messages: string[],
    resultCode: number,
    fieldErrors: string[],
    data: D
}


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(
            `${todolistId}/tasks`,
        )

    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{ D: taskType }>>(
            `${todolistId}/tasks`,
            {title: title},
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType<{ D: {} }>>(
            `${todolistId}/tasks/${taskId}`,
        )
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType<{ D: { item: taskType } }>>(
            `${todolistId}/tasks/${taskId}`,
            {title: title},
        )
    }
}