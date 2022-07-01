import { Grid, Paper, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, Switch } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { IoIosSearch, IoIosBusiness, IoIosPaper, IoIosAddCircle, IoIosTrash } from "react-icons/io";
import { deleteABill, getAllBills } from '../APIModels/Billings';
import { initialSearch, initialState } from '../DBModels/Billings';
import { Link, useNavigate } from "react-router-dom";
import Popup from './Popup';

const BillingContainer = () => {
    const [searchBill, setSearchBill] = useState(initialSearch);
    const [currentBill, setCurrentBill] = useState(initialState);
    const [modify, setModify] = useState(false);
    const [allBillings, setAllBillings] = useState([]);
    // these states and handlers must be sent as props from the parent component
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    // logout function

    const LogoutHandler = () => {
        localStorage.removeItem('profile');
        navigate('/Login');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getSearchedBills = (filter) => {
        getAllBills(filter).then((res) => {
            res[0] ? setAllBillings(res[1]) : setAllBillings([])
        })
    }

    const handleDelete = (id) => {
        deleteABill(id).then(res => {
            res[0] ? alert('Delete Successful!') : alert('Delete Failed!');
        })
    }

    let totalAmount = 0;
    for (let i = 0; i < allBillings.length; i++) {
        totalAmount = + allBillings[i].paidamount;
    }
    // console.log(totalAmount);

    // load all the billing data after login
    useEffect(() => {
        getSearchedBills();
    }, [open, allBillings])

    return (
        <>
            <Paper elevation={3}
                sx={{ padding: 2, display: "flex", flexWrap: "wrap" }}>
                <Button
                    onClick={() => {
                        LogoutHandler();
                    }}
                    variant="contained"
                    sx={{ backgroundColor: "secondary" }}
                    size="medium"
                >
                    Log Out
                </Button>
            </Paper>
            <Grid container spacing={2} padding={3}>
                <Grid item xs={12}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 2, display: "flex", flexWrap: "wrap" }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={2}>
                                <TextField
                                    id="outlined-basic"
                                    label="Search By Name"
                                    variant="outlined"
                                    size="small"
                                    value={searchBill?.fullname}
                                    onChange={(e) =>
                                        setSearchBill({
                                            ...searchBill,
                                            fullname: e.target.value,
                                        })
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <TextField
                                    id="outlined-basic"
                                    label="Search By Phone"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={searchBill?.phone}
                                    onChange={(e) =>
                                        setSearchBill({
                                            ...searchBill,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                {" "}
                                <TextField
                                    id="outlined-basic"
                                    label="Search By Email"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={searchBill?.email}
                                    onChange={(e) =>
                                        setSearchBill({
                                            ...searchBill,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Button
                                    onClick={() => {
                                        getSearchedBills(searchBill);
                                    }}
                                    variant="contained"
                                    sx={{ marginRight: 1 }}
                                >
                                    <IoIosSearch size="1.5rem" />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSearchBill(initialSearch);
                                        getSearchedBills();
                                    }}
                                    variant="outlined"
                                    sx={{ backgroundColor: "secondary" }}
                                    size="medium"
                                >
                                    X
                                </Button>
                            </Grid>
                            {/* add new bill button */}
                            <Grid item xs={6} md={1}>
                                <Button
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                    variant="contained"
                                    sx={{ backgroundColor: "secondary" }}
                                    size="medium"
                                >
                                    <IoIosAddCircle size="1.5rem" />
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                Total Paid Amount : {totalAmount}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/* search area ends */}
                {/* table area starts */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead sx={{ backgroundColor: "#aaa" }}>
                                <TableRow>
                                    <TableCell>Action</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Paid Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allBillings?.map((bill) => (
                                    <TableRow
                                        key={bill?._id}
                                        hover
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {/* manage contact button */}
                                                <Tooltip title="Edit Bill">
                                                    <Button
                                                        onClick={() => {
                                                            setCurrentBill(bill);
                                                            setModify(true);
                                                            setOpen(true);
                                                        }}
                                                        sx={{ marginRight: 0.5 }}
                                                        variant="contained"
                                                    >
                                                        <IoIosPaper />
                                                    </Button>
                                                </Tooltip>
                                                {/* delete a bill */}
                                                <Tooltip title="Delete Bill">
                                                    <Button
                                                        onClick={() => {
                                                            handleDelete(bill?._id);
                                                        }}
                                                        sx={{ marginRight: 0.5 }}
                                                        variant="contained"
                                                    >
                                                        <IoIosTrash />
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            {bill?.fullname}
                                        </TableCell>
                                        <TableCell align="right">{bill?.phone}</TableCell>
                                        <TableCell align="right">{bill?.email}</TableCell>
                                        <TableCell align="right">{bill?.paidamount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Popup
                currentBill={currentBill}
                setCurrentBill={setCurrentBill}
                modify={modify}
                setModify={setModify}
                open={open}
                setOpen={setOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
            />
        </>
    );
};

export default BillingContainer;