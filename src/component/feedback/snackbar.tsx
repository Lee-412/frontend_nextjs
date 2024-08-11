import { Alert, Snackbar } from '@mui/material'
import React from 'react'
export type Severity = 'success' | 'error' | 'warning' | 'info' | undefined;

export interface SnackbarState {
    open: boolean;
    message: string;
    severity: Severity;
}


const SnackbarModal = (props: any) => {
    const { snackbar, setSnackbar } = props;

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar((prevState: any) => ({
            ...prevState,
            open: false,
            message: '',
        }));
    };

    return (
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}

            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

        >
            <Alert
                onClose={handleClose}
                severity={snackbar.severity}
                variant="filled"
                sx={{ width: '100%', whiteSpace: 'pre-line' }}             >
                {snackbar.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarModal