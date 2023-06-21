import React, {ChangeEvent, memo, useCallback} from 'react';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';
import Button, {ButtonProps, ButtonTypeMap} from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import {SuperCheckBox} from './Components/SuperCheckBox';
import {Task} from './Task';
import {TaskWithRedux} from './TaskWithRedux';


export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodoPropsType = {
    todolistId: string
    title: string
    tasks: TaskPropsType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterType
    updateTask: (todolistId: string, id: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}

export type FilterType = 'All' | 'Active' | 'Completed'


export const Todolist = memo((props: TodoPropsType) => {

    // const [title, setTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)


    // const addTaskHandler = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(props.todolistId, title.trim())
    //         setTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler: React.KeyboardEventHandler = (e ) => {
    //     setError(null)
    //     if (e.key === 'Enter') {
    //         addTaskHandler()
    //     }
    //
    // }




    const removeTodolistHandler = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }


    const changeFilterHandler = useCallback((value: FilterType) => {
        props.changeFilter(props.todolistId, value)
    }, [props.todolistId])

    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }, [props.addTask, props.todolistId])



    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        props.updateTodolistTitle(props.todolistId, updateTitle)
    }, [ props.updateTodolistTitle, props.todolistId])


    //tasks

    let tasks = props.tasks
    if (props.filter === 'Active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'Completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    // const onChangeHandler = useCallback((taskId: string, isDone: boolean) => {
    //     props.changeTaskStatus(props.todolistId, taskId, isDone)
    // }, [props.todolistId])
    // const updateTaskHandler = useCallback((taskId: string, updateTitle: string) => {
    //     props.updateTask(props.todolistId, taskId, updateTitle)
    // }, [props.todolistId])
    //
    // const removeTaskHandler = useCallback((taskId: string) => {
    //     props.removeTask(props.todolistId, taskId)
    // }, [props.todolistId])


    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title}
                              callBack={updateTodolistTitleHandler}/>


                <IconButton aria-label="delete"
                            onClick={() => removeTodolistHandler(props.todolistId)}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm callBack={addTaskHandler}/>

                {/*<input*/}
                {/*    value={title}*/}
                {/*    onChange={onChangeHandler}*/}
                {/*    onKeyUp={onKeyPressHandler}*/}
                {/*    className={eror ? 'error' : ''}*/}
                {/*/>*/}
                {/*<button onClick={() => addTaskHandler()}>+</button>*/}
                {/*{eror && <div className="error-message">{eror}</div>}*/}
            </div>


            <ul>
                {tasks.map(t => {
                        // const removeTaskHandler =() => {
                        //     props.removeTask(t.id)
                        // }

                        return (
                            <TaskWithRedux
                                key={t.id}
                                todolistId={props.todolistId}
                                task={t}
                                />
                        )
                    }
                )}
            </ul>
            <div>
                <ButtonWithMemo
                    variant={props.filter === 'All' ? 'contained' : 'outlined'}
                    onClick={() => changeFilterHandler('All')}
                    color={'success'}
                    title={'All'}/>
                <ButtonWithMemo
                    variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                    onClick={() => changeFilterHandler('Active')}
                    color={'secondary'}
                    title={'Active'}/>
                <ButtonWithMemo
                    variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                    onClick={() => changeFilterHandler('Completed')}
                    color={'error'}
                    title={'Completed'}/>


            </div>
        </div>
    )
})


const ButtonWithMemo = memo((props: ButtonProps) => {
    return <Button variant={props.variant}
                   color={props.color}
                   onClick={props.onClick}>{props.title}
    </Button>
})
