import React from 'react';
import './App.css';
import {FilterType, Todolist} from './Todolist';
import AddItemForm from './Components/AddItemForm';
import ButtonAppBar from './Components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    updateTaskTitleAC
} from './redux/tasksReducer';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    updateTodolistTitleAC
} from './redux/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';
import {TasksType} from './App';


export type  TodoListsType = { id: string, title: string, filter: FilterType }


export function AppWithRedux() {

    let todolist = useSelector<AppRootStateType, TodoListsType[]>(state => state.todolist)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTask = (todolistId: string, taskId: string) =>
        dispatch(removeTaskAC(todolistId, taskId))


    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) =>
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone,))


    const addTask = (todolistId: string, title: string) =>
        dispatch(addTaskAC(todolistId, title))


    const updateTaskTitle = (todolistId: string, taskId: string, updateTitle: string) =>
        dispatch(updateTaskTitleAC(todolistId, taskId, updateTitle))


    const changeFilter = (todolistId: string, filter: FilterType) =>
        dispatch(changeFilterAC(todolistId, filter))


    const removeTodolist = (todolistId: string) =>
        dispatch(removeTodolistAC(todolistId))


    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }


    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, updateTitle))
    }

    return (<>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm callBack={addTodolist}/>

                </Grid>
                <Grid container spacing={3}>
                    {
                        todolist.map(el => {
                            let fullFilteredTasks = tasks[el.id]
                            if (el.filter === 'Active') {
                                fullFilteredTasks = tasks[el.id].filter(t => !t.isDone)
                            }
                            if (el.filter === 'Completed') {
                                fullFilteredTasks = tasks[el.id].filter(t => t.isDone)
                            }

                            return <Grid item key={el.id}>
                                <Paper elevation={5} style={{padding: '10px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={fullFilteredTasks}
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
