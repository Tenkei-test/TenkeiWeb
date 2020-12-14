import React, { useState } from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, AppBar, Typography, Grid } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import DehazeIcon from '@material-ui/icons/Dehaze';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CachedIcon from '@material-ui/icons/Cached';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(4),
            width: '70ch',
            color: '#d3d3d3',

            "& .MuiFormLabel-root.Mui-disabled": {
                color: "blueviolet"
            },
            "& .MuiInputBase-root.Mui-disabled": {
                color: "darkblue"
            },


        },
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    Breadcrumbsstyle: {
        margin: theme.spacing(5),
        padding: theme.spacing(0)
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    rootgrid: {
        flexGrow: 1,
        padding: theme.spacing(4),
    },
    papergrid: {
        textAlign: 'left',
        color: "darkblue"
       
    },
    spacegrid: {
        padding: theme.spacing(3),
    },
    commentPaper: {
        maxWidth: 600,
        padding: "10px 10px 10px 5px",
        marginTop: "10px",
        textAlign: 'left',
        color: "darkblue",
        backgroundColor: "#e0e0e0"
       
    }
}))


const headCells = [
    { id: 'fullName', label: 'EC Engine Run State ID' },
    { id: 'email', label: 'Type' },
    { id: 'mobile', label: 'Status' },
    { id: 'department', label: 'Score' },
    { id: 'department2', label: 'Run Start Date' },
    { id: 'department2', label: 'Run End Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function EcEngineUseDetail() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    function handleClickBreadCrumb(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <>
            <div className={classes.Breadcrumbsstyle}>

                <Breadcrumbs separator={<NavigateNextIcon fontSize="large" />} aria-label="breadcrumb">
                    <Link color="inherit" href="/" onClick={handleClickBreadCrumb}>
                        EC Engine
                    </Link>
                    <Typography color="textPrimary">EC Engine Use</Typography>
                </Breadcrumbs>
            </div>
            <Paper className={classes.pageContent}>
                <div className={classes.rootgrid}>
                    <Grid container spacing={3}>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Ec Engine Usage ID</Typography>
                            <Typography className={classes.papergrid} noWrap>HHKB5676G78V</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Ec Engine Use Name</Typography>
                            <Typography className={classes.papergrid} noWrap>2020.07.07 sample</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Gene Model</Typography>
                            <Typography className={classes.papergrid} noWrap>CC SAGA VER 1.0</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Ec Engine Name</Typography>
                            <Typography className={classes.papergrid} noWrap>SAGA CC </Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Run Count</Typography>
                            <Typography className={classes.papergrid} noWrap>2/10</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Best Score</Typography>
                            <Typography className={classes.papergrid} noWrap>1000</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={12}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Comment</Typography>
                           
                                <Paper className={classes.commentPaper}>

                                            <Typography>
                                            コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント
                                            </Typography>

                                </Paper>
                           
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Created Date</Typography>
                            <Typography className={classes.papergrid} noWrap>2020/3/25 11.00</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Last Used Date</Typography>
                            <Typography className={classes.papergrid} noWrap>2020/10/1 12:00</Typography>
                        </Grid>
                    </Grid>
                </div>

                <Toolbar>
                    <Controls.Input
                        label="Search EC Engine Uses.."
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>



                <TblContainer>
                    <TblHead />
                    <TableBody>


                        <TableRow>
                            <TableCell>3GJHBGSJHDB5676G78V</TableCell>
                            <TableCell>Sample</TableCell>
                            <TableCell>END</TableCell>
                            <TableCell>1000</TableCell>
                            <TableCell>2020/12/12 11:30</TableCell>
                            <TableCell>2020/11/12 11:30</TableCell>
                            <TableCell>
                                <Controls.ActionButton
                                    color="primary"
                                >
                                    <DehazeIcon fontSize="small" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    color="secondary">
                                    <CloseIcon fontSize="small" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    color="primary">
                                    <CachedIcon fontSize="small" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    color="primary">
                                    <PlayCircleOutlineIcon fontSize="small" />
                                </Controls.ActionButton>
                            </TableCell>




                            
                        </TableRow>


                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

