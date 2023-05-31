import React, {ChangeEvent} from 'react';
import AddItemForm from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton';
import {SuperCheckBox} from './Components/SuperCheckBox';


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


export const Todolist = (props: TodoPropsType) => {

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


    const removeTaskHandler = (todolistId: string, id: string) => {
        props.removeTask(todolistId, id)
    }

    const removeTodolistHandler = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }


    const changeFilterHandler = (value: FilterType) => {
        props.changeFilter(props.todolistId, value)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }

    const updateTaskHandler = (id: string, updateTitle: string) => {
        props.updateTask(props.todolistId, id, updateTitle)
    }

    const updateTodolistTitleHandler = (updateTitle: string) => {
        props.updateTodolistTitle(props.todolistId, updateTitle)
    }


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
                {props.tasks.map(t => {
                        // const removeTaskHandler =() => {
                        //     props.removeTask(t.id)
                        // }


                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(props.todolistId, t.id, newIsDoneValue)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <SuperCheckBox isDone={t.isDone} onChangeHandler={onChangeHandler}/>
                                <EditableSpan oldTitle={t.title}
                                              callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)}/>
                                <IconButton aria-label="delete" onClick={() => removeTaskHandler(props.todolistId, t.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <Button variant={props.filter === 'All' ? 'contained' : 'outlined'} color="success"
                        onClick={() => changeFilterHandler('All')}>All
                </Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'outlined'} color="secondary"
                        onClick={() => changeFilterHandler('Active')}>Active
                </Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'outlined'} color="error"
                        onClick={() => changeFilterHandler('Completed')}>Completed
                </Button>
            </div>
        </div>
    )
}
