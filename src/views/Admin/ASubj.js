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

export default function ASubj() {
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

    // const [age, setAge] = useState('');
    const [deptN, setDeptN] = useState();
    const [semN, setSemN] = useState();
    const [acadYear, setAcadY] = useState("2023-2024");

    const [subjN, setSubjN] = useState();
    const [dept2, setDept2] = useState();
    const [sem2, setSem2] = useState();

    const [deptAll, setDeptAll] = useState();
    const [subjDat, setSubD] = useState({ rows: [], columns: [] });

    async function fetchDept() {
        await axios.get("http://localhost:8000/api/department")
            .then((res) => {
                setDeptAll(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async function fetchSubj() {
        if (!semN || !deptN) {
            notifyE("Please provide all inputs for query!");
            return;
        }
        await axios.get(`http://localhost:8000/api/subject/?semester=${semN}&department=${deptN}`)
            .then((res) => {
                // setSubD(res.data);
                var dubD = { ...subjDat };
                dubD.rows = res.data;
                dubD.columns = [
                    { field: 'id', headerName: 'Id', width: 150 },
                    { field: 'subject', headerName: 'Subject', width: 150 },
                    { field: 'semester', headerName: 'Semester', width: 150 },
                    { field: 'department', headerName: 'Department', width: 150 }
                ]
                setSubD({ ...dubD });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchDept();
        // fetchSubj();
    }, [])

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    async function addSubj() {
        if (!dept2 || !sem2) {
            notifyE("Please fill All Details!")
            return;
        }
        else {
            await axios.post("http://localhost:8000/api/subject/", { "subject": subjN, "semester": sem2, "department": dept2 }, { withCredentials: true },
                {
                    headers: {
                        'X-CSRFToken': cookies.get('csrftoken')
                    }
                })
                .then((res) => {
                    // console.log(res);
                    notifyS({ msg: "Subject has been added successfully!" })
                    setOpen(false);
                    fetchSubj();
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
                            <p className="tL f1-2"><b>Provide the specified inputs to view all subjects for the same</b></p>
                            <div className="divf wFull jusSB">
                                <div className="divf fwrap jusStart wFull gapM">
                                    {/* <InputLabel id="demo-select-small-label">Age</InputLabel> */}
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Academic Year</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            // id="demo-select-small"
                                            value={acadYear}
                                            label="Academic Year"
                                            onChange={(e) => { setAcadY(e.target.value) }}
                                        >
                                            <MenuItem value={acadYear}>{acadYear}</MenuItem>
                                            <MenuItem value={acadYear}>{acadYear}</MenuItem>
                                            <MenuItem value={acadYear}>{acadYear}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Semester</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            // id="demo-select-small"
                                            value={semN}
                                            label="Semester"
                                            onChange={(e) => { setSemN(e.target.value) }}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={9}>9</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                </div>
                                <Button variant="contained" onClick={fetchSubj}>Find</Button>
                            </div>

                        </div>
                    </form>
                    <div className="divf jusSB">
                        <p className="dashTT1">Subjects Data</p>
                        <Button className="muiButOut" variant="contained" endIcon={<AddCircleRounded />} onClick={handleOpen}>Add Subject</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add Subject
                                </Typography>
                                <TextField id="filled-basic" label="Subject Name" size="small" value={subjN} onChange={(e) => setSubjN(e.target.value)} />
                                {/* <TextField id="filled-basic" label="Semester" size="small" value={sem2} onChange={(e) => { setSem2(e.target.value) }} /> */}
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">Semester</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        // id="demo-select-small"
                                        value={sem2}
                                        label="Semester"
                                        onChange={(e) => { setSem2(e.target.value) }}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">Department</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        // id="demo-select-small"
                                        value={dept2}
                                        label="Department"
                                        onChange={(e) => { setDept2(e.target.value) }}
                                    >
                                        {deptAll && deptAll.map((el) => {
                                            return (
                                                <MenuItem value={el.name}>{el.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={addSubj}>Save</Button>
                            </Box>
                        </Modal>
                    </div>
                    {subjDat.rows.length ? <DTable data={subjDat} /> : <></>}
                    {/* <DTable /> */}
                </section>
            </div>
        </>
    )
}