import { AddAPhoto, AddCircleRounded, PlusOne } from "@material-ui/icons";
import Navbar from "../../components/Navbar";
import LineC from "../../components/charts/LineC";
import DTable from "../../components/tables/Dtable";
import "../../css/dash.css";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { notifyE, notifyS } from "../../funcs/func1";
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
// import AddIcon from '@mui/icons-material/Add';

export default function AFacult() {
    const cookies = new Cookies(null, { path: '/' });
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgba(255, 255, 255, 1)',
        // border: '2px solid #000',
        borderRadius: '10px',
        boxShadow: 24,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: '13px'
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [factDat, setFactD] = useState({ rows: [], columns: [] })

    const [age, setAge] = useState('');
    const [facName, setFacName] = useState();
    const [deptN, setDeptN] = useState();

    const [deptI, setDeptI] = useState();

    const [deptAll, setDeptAll] = useState();

    async function fetchDept() {
        axios.get("http://localhost:8000/api/department")
            .then((res) => {
                setDeptAll(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // useEffect(() => {

    // }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    async function fetchFact() {
        if (!deptI) {
            notifyE("Please provide department!");
            return;
        }
        await axios.get(`http://localhost:8000/api/faculty/?department=${deptI}`)
            .then((res) => {
                console.log(res.data);
                var dubD = { ...factDat };
                dubD.rows = res.data;
                dubD.columns = [
                    { field: 'id', headerName: 'Id', width: 150 },
                    { field: 'faculty_name', headerName: 'Faculty Name', width: 150 },
                    { field: 'department', headerName: 'Department', width: 150 }
                ]
                setFactD({ ...dubD });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {

        // fetchFact();
        fetchDept();
    }, []);

    async function addFact() {
        if (!facName || !deptN) {
            notifyE("Please fill All Details!")
            return;
        }
        else {
            axios.post("http://localhost:8000/api/faculty/", { "faculty_name": facName, "department": deptN }, { withCredentials: true },
                {
                    headers: {
                        'X-CSRFToken': cookies.get('csrftoken')
                    }
                })
                .then((res) => {
                    console.log(res);
                    notifyS({ msg: "Successfully created!" })
                    setOpen(false);
                    fetchDept();
                    fetchFact();
                })
                .catch((err) => {
                    console.log(err);
                    notifyE("Some error occurred!");
                })

        }
    }

    return (
        <>
            <Navbar />
            <div className="divf fdirc fullbg dashMain">
                <ToastContainer />
                <div className="dashbgI"></div>
                <p className="uTypeN">Admin Dashboard</p>
                <section className="paddM">
                    <form>
                        <div className="divf fdirc comBox gapM">
                            <p className="tL f1-2"><b>Provide the specified inputs to view all Faculties for the same</b></p>
                            <div className="divf wFull jusSB">
                                <div className="divf fwrap jusStart wFull gapM">
                                    <FormControl sx={{ minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Department</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            // id="demo-select-small"
                                            value={deptI}
                                            label="Department"
                                            onChange={(e) => { setDeptI(e.target.value) }}
                                        >
                                            {deptAll && deptAll.map((el) => {
                                                return (
                                                    <MenuItem value={el.name}>{el.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <Button variant="contained" onClick={fetchFact}>Find</Button>
                            </div>

                        </div>
                    </form>
                    <div className="divf jusSB">
                        <p className="dashTT1">Faculties data</p>
                        <Button className="muiButOut" variant="outlined" endIcon={<AddCircleRounded />} onClick={handleOpen}>Add Faculty</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add Faculty
                                </Typography>
                                <TextField
                                    label="Faculty Name"
                                    id="outlined-size-small"
                                    size="small"
                                    onChange={(e) => { setFacName(e.target.value) }}
                                />
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">Department</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        // id="demo-select-small"
                                        value={deptN}
                                        label="Department"
                                        onChange={(e) => { setDeptN(e.target.value) }}
                                    >
                                        {deptAll && deptAll.map((el) => {
                                            return (
                                                <MenuItem value={el.name}>{el.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={addFact}>Save</Button>
                            </Box>
                        </Modal>
                    </div>
                    {factDat.rows.length ? <DTable data={factDat} /> : <></>}
                    {/* <DTable /> */}
                </section>
            </div>
        </>
    )
}