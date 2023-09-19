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
import { allData } from "../../data/basicD";
import { Link } from "react-router-dom";
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
    const [searchQs, setSearchQ] = useState({ semester: 0, department: {} })
    const [deptN, setDeptN] = useState();
    const [semN, setSemN] = useState();
    const [acadYear, setAcadY] = useState("2023-2024");

    const [addSubjI, setAddSubjI] = useState({ subject: "", semester: "", department: "", deptN: "" })

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
        if (!semN || !searchQs.department) {
            notifyE("Please provide all inputs for query!");
            return;
        }
        await axios.get(`http://localhost:8000/api/subject/?semester=${semN}&department=${searchQs.department.id}`)
            .then((res) => {
                // setSubD(res.data);
                var dubD = { ...subjDat };
                dubD.rows = res.data;
                dubD.rows.forEach((el) => {
                    if (el.department === searchQs.department.id) {
                        el.department = searchQs.department.name
                    }
                })
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
        if (!addSubjI.department || !addSubjI.semester || !addSubjI.subject) {
            notifyE("Please fill All Details!")
            return;
        }
        else {
            await axios.post("http://localhost:8000/api/subject/", { "subject": addSubjI.subject, "semester": addSubjI.semester, "department": addSubjI.department }, { withCredentials: true },
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
                <Link className="uTypeN" to="/admin">Admin Dashboard</Link>
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
                                            {allData && allData.semester.map((el) => {
                                                return (
                                                    <MenuItem value={el}>{el}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Department</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="deptId2"
                                            // value={deptN}
                                            defaultValue={""}
                                            label="Department"
                                            onChange={(e) => {
                                                setSearchQ({
                                                    ...searchQs,
                                                    department: e.target.value
                                                })
                                                document.getElementById("deptId2").value = e.target.value.name;
                                            }}
                                        >
                                            {deptAll && deptAll.map((el) => {
                                                return (
                                                    <MenuItem value={el}>{el.name}</MenuItem>
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
                                <TextField id="filled-basic" label="Subject Name" size="small" value={addSubjI.subject} onChange={(e) => setAddSubjI({ ...addSubjI, subject: e.target.value })} />
                                {/* <TextField id="filled-basic" label="Semester" size="small" value={sem2} onChange={(e) => { setSem2(e.target.value) }} /> */}
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">Semester</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        // id="demo-select-small"
                                        value={addSubjI.semester}
                                        label="Semester"
                                        onChange={(e) => { setAddSubjI({ ...addSubjI, semester: e.target.value }) }}
                                    >
                                        {allData && allData.semester.map((el) => {
                                            return (
                                                <MenuItem value={el}>{el}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">Department</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        // id="demo-select-small"
                                        value={addSubj.deptN}
                                        label="Department"
                                        onChange={(e) => { setAddSubjI({ ...addSubjI, department: e.target.value.id, deptN: e.target.value.name }) }}
                                    >
                                        {deptAll && deptAll.map((el) => {
                                            return (
                                                <MenuItem value={el}>{el.name}</MenuItem>
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