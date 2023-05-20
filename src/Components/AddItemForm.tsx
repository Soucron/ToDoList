import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import {v1} from 'uuid';

type AddItemFormPropsType = {
    callBack : (title: string) => void,
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (title.trim() !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler: React.KeyboardEventHandler<HTMLInputElement> = (e ) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }

    }




    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}

        </div>
    );
};

export default AddItemForm;