import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {appSetErrorAC, ErrorStatusType} from './state/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const dispatch = useAppDispatch()
    const error = useSelector<AppRootStateType, ErrorStatusType>(state => state.app.error)
    //const [open, setOpen] = useState(true)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(appSetErrorAC(null))
        //setOpen(false)
    }
    return (
        <Snackbar open={!!error } autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    )
}
