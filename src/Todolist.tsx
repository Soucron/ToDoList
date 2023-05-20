import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import {Button} from './Components/Button';
import AddItemForm from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';

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

    const updateTaskHandler = (id: string,updateTitle: string) => {
        props.updateTask(props.todolistId,id,updateTitle)
    }

    const updateTodolistTitleHandler = (updateTitle: string) => {
        props.updateTodolistTitle(props.todolistId, updateTitle)
    }




    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler}/>

                <button onClick={() => removeTodolistHandler(props.todolistId)}>X</button>
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
                                <input type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}/>
                                <EditableSpan oldTitle={t.title} callBack={(updateTitle)=>updateTaskHandler(t.id,updateTitle)}/>
                                <button onClick={() => removeTaskHandler(props.todolistId, t.id)}>X</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}
