import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './Components/AddItemForm';
import ButtonAppBar from './Components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC, TasksType,
    updateTaskTitleAC
} from './redux/tasksReducer';
import {
    addTodolistAC,
    changeFilterAC, fetchTodolistsThunk, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistFullType,
    updateTodolistTitleAC
} from './redux/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatchType, AppRootStateType} from './redux/store';
import {todolistAPI} from './api/todolist-api';




export function AppWithRedux() {


    // useEffect( () => {
    //     todolistAPI.getTodolist().then((res) => {
    //         let todos = res.data
    //         dispatch(setTodolistsAC(todos))
    //     })
    // }, [])


    let todolist = useSelector<AppRootStateType, TodolistFullType[]>(state => state.todolist)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(fetchTodolistsThunk)
    }, [])



    const removeTask = useCallback((todolistId: string, taskId: string) =>
        dispatch(removeTaskAC(todolistId, taskId)), [dispatch])


    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) =>
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone)), [dispatch])


    const addTask = useCallback((todolistId: string, title: string) =>
        dispatch(addTaskAC(todolistId, title)), [dispatch])


    const updateTaskTitle = useCallback((todolistId: string, taskId: string, updateTitle: string) =>
        dispatch(updateTaskTitleAC(todolistId, taskId, updateTitle)), [dispatch])


    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) =>
        dispatch(changeFilterAC(todolistId, filter)), [dispatch])


    const removeTodolist = useCallback((todolistId: string) =>
        dispatch(removeTodolistAC(todolistId)), [dispatch])


    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])


    const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, updateTitle))
    }, [dispatch])

    return (<>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm callBack={addTodolist}/>

                </Grid>
                <Grid container spacing={3}>
                    {
                        todolist.map(el => {


                            return <Grid item key={el.id}>
                                <Paper elevation={5} style={{padding: '10px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasks[el.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTaskTitle}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>


        </>

    );


}
