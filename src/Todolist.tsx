import React, {ChangeEvent, useState} from 'react';
import {Button} from './Components/Button';

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodoPropsType = {
    title: string
    tasks: TaskPropsType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterType
}

export type FilterType = 'All' | 'Active' | 'Completed'


export const Todolist = (props: TodoPropsType) => {

    const [title, setTitle] = useState('')
    const [eror, setError] = useState<string | null>(null)
    let [filterName, setFilterName] = useState<FilterType>('All')


    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeFilterHandler = (filter: FilterType) => {
        props.changeFilter(filter)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={e =>
                        setTitle(e.currentTarget.value)}
                    onKeyUp={e => {
                        setError(null)
                        if (e.key === 'Enter') {
                            addTaskHandler()
                        }
                    }}
                    className={eror ? 'error' : ''}
                />
                <Button callback={() => addTaskHandler()} name={'+'}/>
                {eror && <div className="error-message">{eror}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {

                        // const removeTaskHandler =() => {
                        //     props.removeTask(t.id)
                        // }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title}</span>
                                <Button callback={() => removeTaskHandler(t.id)} name={'X'}/>
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
