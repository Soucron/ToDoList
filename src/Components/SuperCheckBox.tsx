import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';

export type CheckBoxType = {
    isDone: boolean,
    onChangeHandler: (e:ChangeEvent<HTMLInputElement>) => void
}
export const SuperCheckBox = (c: CheckBoxType) => {
    return (
        <Checkbox checked={c.isDone} onChange={c.onChangeHandler}/>
    );
};

