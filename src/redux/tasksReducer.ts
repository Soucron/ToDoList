import {v1} from 'uuid';
import {TasksType} from '../App';
import {AddTodolistType, RemoveTodolistType} from './todolistReducer';

const initialState: TasksType = {}

export type ActionsType = RemoveTaskACTYPE
    | AddTaskACType
    | ChangeTaskStatusACType
    | UpdateTaskACType
    | AddTodolistType
    | RemoveTodolistType

export type RemoveTaskACTYPE = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskTitleAC>


export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                        ...t,
                        isDone: !t.isDone
                    } : t)
            }
        }
        case 'UPDATE-TASK' : {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId ? {...task, title: action.payload.updateTitle} : task)
            }
        }
        case 'ADD-TODOLIST' : {
            return {...state, [action.payload.newTodolistId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const copy = {...state}
            delete copy[action.payload.todolistId]
            return copy
        }
        default:
            return state
    }
}


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title,
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskId,
            isDone,

        }
    } as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            updateTitle
        }
    } as const
}


