import {TodoListsType} from '../App';
import {FilterType} from '../Todolist';



export const todolistReducer = (state: TodoListsType[], action: TodolistReducerType): TodoListsType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(todolist => todolist.id === action.payload.todolistId ?
                {...todolist, filter: action.payload.filter} : todolist)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        }
        case 'UPDATE-TODOLIST-TITLE' : {
            return state.map(todolist => todolist.id === action.payload.todolistId ?
                {...todolist, title: action.payload.updateTitle} : todolist)
        }
        case 'ADD-TODOLIST' : {
            return [{id: action.payload.newTodolistId, title: action.payload.newTitle, filter: 'All'}, ...state]
        }
        default:
            return state
    }
}

type TodolistReducerType = ChangeFilterType | RemoveTodolistType | UpdateTodolistTitleType | AddTodolistType

type ChangeFilterType = ReturnType<typeof changeFilterAC>

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>

type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitleAC>

type AddTodolistType = ReturnType<typeof addTodolistAC>

export const changeFilterAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const updateTodolistTitleAC = (todolistId: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistId,
            updateTitle
        }
    } as const
}

export const addTodolistAC = (newTodolistId: string, newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistId,
            newTitle
        }
    } as const
}

