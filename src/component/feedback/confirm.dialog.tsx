import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';

const ConfirmDialog = (props: any) => {
    const { open, setOpenDialog, title, message, setConformDialog } = props;
    const onConfirm = () => {
        setConformDialog(true);

    }
    const onClose = () => {
        setOpenDialog(false)
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={onConfirm} color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
