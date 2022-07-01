import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, DialogContentText, Grid, TextField } from '@mui/material';
import { initialState } from '../DBModels/Billings';
import { createNewBill, updateABill } from '../APIModels/Billings';
import SuccessFailureAlert from '../Resources/SuccessFailureAlert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
const Popup = ({ open, setOpen, handleClickOpen, handleClose, currentBill, setCurrentBill, modify, setModify, }) => {

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openFailureAlert, setOpenFailureAlert] = useState(false);
    const [message, setMessage] = useState("");
    const openFailure = (message) => {
        setMessage("");
        setOpenSuccessAlert(false);
        setOpenFailureAlert(true);
        setMessage(message);
    };
    const openSuccess = (message) => {
        setMessage("");
        setOpenSuccessAlert(true);
        setOpenFailureAlert(false);
        setMessage(message);
    };
    // validation function
    const validateBill = () => {
        if (!currentBill?.fullname) {
            return "Name cannot be empty!"
        }
        if (currentBill?.phone.length < 11 || currentBill?.phone.length > 11) {
            return "Phone number must be of 11 Digits!"
        }
        if (!String(currentBill?.email)
            .toLowerCase()
            .match(
                /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
            )) {
            return "Insert a valid email!"
        }
        if (currentBill?.paidamount <= 0) {
            return 'Paid amount must be greater than 0'
        }

        return ""
    }

    const clear = () => {
        setCurrentBill(initialState);
    }

    const saveNewBill = () => {
        let isValid = validateBill();
        // checking if the form values are valid
        if (isValid !== "") {
            openFailure(isValid);
        } else {
            createNewBill(currentBill)
                .then((res) => {
                    if (res[0]) {
                        openSuccess(res[1]);
                        clear();
                    } else {
                        openFailure(res[1]);
                    }
                });
        }

    };

    const editBill = (id, data) => {
        let isValid = validateBill();
        // checking if the form values are valid
        if (isValid !== "") {
            openFailure(isValid);
        } else {
            updateABill(id, data).then((res) => {
                if (res[0]) {
                    openSuccess(res[1]);
                    clear();
                    handleClose();
                } else {
                    openFailure(res[1]);
                }
            })
        }

    }

    // console.log('sent bill', modify);
    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="xl"
                open={open}
                onClose={() => {
                    handleClose();
                }}
            >
                <DialogTitle>Add New Bill</DialogTitle>
                <SuccessFailureAlert
                    openSuccessAlert={openSuccessAlert}
                    message={message}
                    openFailureAlert={openFailureAlert}
                    setopenSuccessAlert={setOpenSuccessAlert}
                    setopenFailureAlert={setOpenFailureAlert}
                />
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => {
                                    setCurrentBill({ ...currentBill, fullname: e.target.value });
                                }}
                                label="Bill Name"
                                fullWidth
                                size="small"
                                id="outlined-read-only-input"
                                value={currentBill?.fullname}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => {
                                    setCurrentBill({ ...currentBill, email: e.target.value });
                                }}
                                label="Billing Email"
                                fullWidth
                                size="small"
                                id="outlined-read-only-input"
                                value={currentBill?.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => {
                                    setCurrentBill({ ...currentBill, phone: e.target.value });
                                }}
                                label="Phone"
                                inputProps={{
                                    maxLength: 11,
                                }}
                                fullWidth
                                size="small"
                                id="outlined-read-only-input"
                                value={currentBill?.phone}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={(e) => {
                                    setCurrentBill({ ...currentBill, paidamount: parseInt(e.target.value) });
                                }}
                                label="Paid Amount"
                                type="number"
                                fullWidth
                                size="small"
                                id="outlined-read-only-input"
                                value={currentBill?.paidamount}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        if (modify) {
                            editBill(currentBill?._id, currentBill);
                        } else {
                            saveNewBill();
                        }

                        // handleClose();
                    }}>{modify ? "Update Bill" : "Create New Bill"}</Button>
                    <Button onClick={() => {
                        handleClose();
                        clear();
                        setOpenSuccessAlert(false);
                        setOpenFailureAlert(false);
                        setMessage("");
                    }}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Popup;