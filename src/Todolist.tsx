import React, {useState} from 'react';

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
}

export type FilterType = 'all' | 'active' | 'completed'


export const Todolist = (props: TodoPropsType) => {

    let [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const changeFilterHandler = (filter:FilterType) => {
        props.changeFilter(filter)
    }

    const removeTaskHandler =(id:string) => {
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
                        if (e.key === 'Enter') {
                            addTaskHandler()
                        }
                    }}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    // const removeTaskHandler =() => {
                    //     props.removeTask(t.id)
                    // }

                        return (
                            <li>
                                <input type={'checkbox'} checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>removeTaskHandler(t.id)}>X</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={()=> changeFilterHandler('all')}>All</button>
                <button onClick={()=> changeFilterHandler('active')}>Active</button>
                <button onClick={()=> changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}
