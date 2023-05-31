
import {v1} from 'uuid';
import {TodoListTaskType} from '../App';

export const tasksReducer = (state: TodoListTaskType, action: TasksActionType): TodoListTaskType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId) }
            // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(),title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask,...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: !t.isDone} : t)}
        }
        case 'UPDATE-TASK' : {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task=>
                task.id === action.payload.taskId ? {...task, title: action.payload.updateTitle } : task)}
        }
        case 'ADD-BLANK-TASK' : {
            return {...state, [action.payload.newTodolistId]:[]}
        }
        default:
            return state
    }
}

type TasksActionType = RemoveTaskACTYPE | AddTaskACType | ChangeTaskStatusACType | UpdateTaskACType | AddBlankTaskACType

type RemoveTaskACTYPE = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type AddBlankTaskACType = ReturnType<typeof addBlankTaskAC>

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

export const updateTaskAC = (todolistId: string, taskId: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            updateTitle
        }
    } as const
}

export const addBlankTaskAC = (newTodolistId: string) => {
    return {
        type: 'ADD-BLANK-TASK',
        payload: {
            newTodolistId
        }
    } as const
}
