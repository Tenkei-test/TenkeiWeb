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
import Box from "@material-ui/core/Box";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
        color: "darkblue",
    },
    dataDisplayHeader: {
        textAlign: 'center',
        color: "darkblue",
        padding:"10px"
    },
    spacegrid: {
        padding: theme.spacing(3),
    },
    commentPaper: {
        maxWidth: 600,
        minHeight: 100,
        padding: "10px 10px 10px 5px",
        marginTop: "10px",
        textAlign: 'left',
        color: "darkblue",
        backgroundColor: "#e0e0e0"

    },
    Breadcrumbsstyle: {
        margin: theme.spacing(5),
        padding: theme.spacing(0)
    },
    tabroot: {
        flexGrow: 1,
        backgroundColor: "#eceff1",
        display: 'flex',
        height: 224,
        border: `3px solid ${theme.palette.divider}`,
    
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    }
}))


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const headCells = [
    { id: 'fullName', label: 'ID' },
    { id: 'email', label: 'Name' },
    { id: 'mobile', label: 'Run Count' },
    { id: 'department', label: 'Best Score' },
    { id: 'department2', label: 'Created Date' },
    { id: 'department2', label: 'Last Used Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function EcEngineRunStateDetail() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [tabValue, setTabValue] = React.useState(0);

    const tabHandleChange = (event, newValue) => {
        setTabValue(newValue);
    };

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

    function handleClickBreadCrumb(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
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

    return (
        <>
            <div className={classes.Breadcrumbsstyle}>

                <Breadcrumbs separator={<NavigateNextIcon fontSize="large" />} aria-label="breadcrumb">
                    <Link color="inherit" href="/" onClick={handleClickBreadCrumb}>
                        EC Engine
                    </Link>
                    <Link color="inherit" href="/" onClick={handleClickBreadCrumb}>
                        EC Engine Use
                    </Link>
                    <Typography variant="h5" color="textPrimary">EC Engine Run State</Typography>
                </Breadcrumbs>
            </div>
            <Paper className={classes.pageContent}>
                <div className={classes.rootgrid}>
                    <Grid container spacing={3}>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>EC Engine Run State ID</Typography>
                            <Typography className={classes.papergrid} noWrap>6787HKUHKJN67Gghm</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Status</Typography>
                            <Typography className={classes.papergrid} noWrap>End Properly</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>EC Engine Name</Typography>
                            <Typography className={classes.papergrid} noWrap>CC SAGA VER 1.0</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>EC Engine Use Name</Typography>
                            <Typography className={classes.papergrid} noWrap>Sample varient</Typography>
                        </Grid>

                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Type</Typography>
                            <Typography className={classes.papergrid} noWrap>Complex Data</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Score</Typography>
                            <Typography className={classes.papergrid} noWrap>1000</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Run State Date</Typography>
                            <Typography className={classes.papergrid} noWrap>2020/3/25 11.00</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Run End Date</Typography>
                            <Typography className={classes.papergrid} noWrap>2020/10/1 12:00</Typography>
                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Genetic Parameter</Typography>

                            <Paper className={classes.commentPaper}>

                                <Typography>
                                    {'\{GenerationCount:1000, Trial:500, Limit:700\}'}
                                </Typography>

                            </Paper>

                        </Grid>
                        <Grid className={classes.spacegrid} item xs={6}>
                            <Typography className={classes.papergrid} style={{ fontWeight: 600 }} noWrap>Comment</Typography>

                            <Paper className={classes.commentPaper}>

                                <Typography>
                                    コメントコメントコメントコメントコメントコメントコメン Comment
                                    トコメントコメントコメントコメントコメントコメントコメントコメントコメント
                                </Typography>

                            </Paper>

                        </Grid>
                        <Grid className={classes.spacegrid} item xs={12}>
                            <Typography className={classes.dataDisplayHeader} style={{ fontWeight: 600 }} noWrap>Display Data Area (Tab) Tables, Graph etc</Typography>
                            <div className={classes.tabroot}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={tabValue}
                                onChange={tabHandleChange}
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
                               
                            >
                                <Tab label="Input Data 1" {...a11yProps(0)} />
                                <Tab label="Input Data 2" {...a11yProps(1)} />
                                <Tab label="Output Data 1" {...a11yProps(2)} />
                                <Tab label="Output Score" {...a11yProps(3)} />

                            </Tabs>
                           

                            <TabPanel value={tabValue} index={0}>
                                Data One
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                Data Two
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                Output Data One
                             </TabPanel>
                            <TabPanel value={tabValue} index={3}>
                            Output Score
                            </TabPanel>
                            <TabPanel value={tabValue} index={4}>
                                Item Five
                          </TabPanel>
                            <TabPanel value={tabValue} index={5}>
                                Item Six
                         </TabPanel>
                            <TabPanel value={tabValue} index={6}>
                                Item Seven
                         </TabPanel>
                        </div>
                        </Grid>
                        

                    </Grid>

                </div>




            </Paper>
        </>
    )
}

