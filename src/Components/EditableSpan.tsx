import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}



export const EditableSpan = (span: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    let [updateTitle, setUpdateTitle] = useState(span.oldTitle)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
        span.callBack(updateTitle)
    }

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTask()
        }
    }

    return (
        edit
            ? <input onChange={onChangeHandler} value={updateTitle} onBlur={editHandler}/>
            : <span onDoubleClick={editHandler}>{span.oldTitle}</span>
    );
};

