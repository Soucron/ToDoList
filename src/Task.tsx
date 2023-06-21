import React, {ChangeEvent, memo, useCallback} from 'react';
import {SuperCheckBox} from './Components/SuperCheckBox';
import {EditableSpan} from './Components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './App';

export type TaskPropsType = {
    task: TaskType,
    removeTask: ( id: string) => void,
    updateTask: ( id: string, updateTitle: string) => void,
    changeTaskStatus: ( id: string, newIsDoneValue: boolean) => void


}
export const Task = memo(({
                         task,
                         removeTask,
                         updateTask,
                         changeTaskStatus
                     }: TaskPropsType) => {

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus( task.id, newIsDoneValue)
    }, [changeTaskStatus, task.id ])
    const updateTaskHandler = (id: string, updateTitle: string) => {
        updateTask( id, updateTitle)
    }
    const removeTaskHandler = (id: string) => {
        removeTask(id)
    }

    return (
        <li className={task.isDone ? 'is-done' : ''}>
        <SuperCheckBox isDone={task.isDone} onChangeHandler={onChangeHandler}/>
        <EditableSpan oldTitle={task.title}
                      callBack={(updateTitle) => updateTaskHandler(task.id, updateTitle)}/>
        <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.id)}>
            <DeleteIcon/>
        </IconButton>
    </li>)
});

