import {TasksStateType} from '../App';

import {
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {appSetStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: TaskType[],
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {


}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string,  todolistId: string, ): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) : SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}




export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(appSetStatusAC('succeed'))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0 ) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(appSetStatusAC('succeed'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        }) .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(appSetStatusAC('succeed'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeed'))
                } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const changeTaskStatusTC = (taskId: string,  status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {


        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            dispatch(appSetStatusAC('loading'))
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }).then((res) => {
                if (res.data.resultCode === 0) {
                    const action = changeTaskStatusAC(taskId, status, todolistId)
                    dispatch(action)
                    dispatch(appSetStatusAC('succeed'));
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
                .catch((error) => {
                    handleServerNetworkError(error.message, dispatch)
                })

        }
    }
}


export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string ) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task  = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            dispatch(appSetStatusAC('loading'))
            todolistsAPI.updateTask(todolistId, taskId, {
                title: title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }).then((res) => {
                if (res.data.resultCode === 0) {
                    const action = changeTaskTitleAC(taskId, title, todolistId)
                    dispatch(action)
                    dispatch(appSetStatusAC('succeed'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
                .catch((error) => {
                    handleServerNetworkError(error.message, dispatch)
                })
        }
    }
}
