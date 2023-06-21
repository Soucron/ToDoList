import React, {ChangeEvent, memo, useCallback} from 'react';
import {SuperCheckBox} from './Components/SuperCheckBox';
import {EditableSpan} from './Components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './App';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from './redux/tasksReducer';

export type TaskPropsType = {
    task: TaskType,
    todolistId: string
}
export const TaskWithRedux = memo(({
                         task,
                         todolistId
                     }: TaskPropsType) => {

    const dispatch = useDispatch()

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let isDone = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todolistId,task.id,isDone))
    }, [changeTaskStatusAC, task.id ])
    const updateTaskHandler = useCallback((taskId: string, updateTitle: string) => {
        dispatch(updateTaskTitleAC(todolistId, taskId, updateTitle))
    } , [updateTaskTitleAC, task.id] )
    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
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

