import {tasksReducer} from './tasksReducer';
import {todolistReducer} from './todolistReducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistReducer
})

export const  store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

