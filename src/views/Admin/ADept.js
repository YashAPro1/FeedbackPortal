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
import { TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyE, notifyS } from "../../funcs/func1";
// import AddIcon from '@mui/icons-material/Add';

export default function ADept() {
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
    const [deptD, setDeptD] = useState({ rows: [], columns: [] });
    const [dName, setDname] = useState("");

    async function fetchDept() {
        axios.get("http://localhost:8000/api/department")
            .then((res) => {
                // console.log(res.data);
                var dubD = { ...deptD };
                dubD.rows = res.data;
                dubD.columns = [
                    { field: 'id', headerName: 'Id', width: 150 },
                    { field: 'name', headerName: 'Department', width: 150 },
                ]
                setDeptD({ ...dubD });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {

        fetchDept();
    }, []);

    async function addDept() {
        if (!dName) {
            notifyE("Please fill Department Name!")
            return;
        }
        else {
            axios.post("http://localhost:8000/api/department/", { "name": dName })
                .then((res) => {
                    // console.log(res);
                    setDname();
                    notifyS({ msg: "Successfully created!" })
                    setOpen(false);
                    fetchDept();
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
                    <div className="divf jusSB">
                        <p className="dashTT1">Departments data</p>
                        <Button className="muiButOut" variant="outlined" endIcon={<AddCircleRounded />} onClick={handleOpen}>Add Department</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add Department
                                </Typography>
                                <TextField id="filled-basic" label="Department Name" onChange={(e) => { setDname(e.target.value) }}
                                    size="small" />
                                <Button variant="contained" onClick={addDept}>Save</Button>
                            </Box>
                        </Modal>
                    </div>
                    {deptD.rows.length ? <DTable data={deptD} /> : <></>}

                </section>
            </div>
        </>
    )
}