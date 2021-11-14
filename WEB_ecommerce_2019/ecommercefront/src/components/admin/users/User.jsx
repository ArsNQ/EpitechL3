import {Col, Row, Modal} from "react-bootstrap";
import styles from "../../admin/users/user.module.css";
import {Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import EditUserModal from '../editModal/user';
import apiManager from '../../../http/apiManager';


const UserHeader = () => {
    return(
        <Row className={styles.backUser2}>
            <Col>First Name</Col>
            <Col>Last Name</Col>
            <Col>Email</Col>
            <Col>Address</Col>
            <Col>Edit</Col>
            <Col>Delete</Col>
        </Row>
    )
};

const UserBody = ({ data }) => {

    const handleClose = () => { setOpenEdit(false); setOpenAddress(false); setOpenAlert(false)};
    const handleShowAddress = () => setOpenAddress(true);
    const handleShowEdit = () => setOpenEdit(true);
    const showAlert = () => setOpenAlert(true);
    const [openAddress, setOpenAddress] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const deleteUser = (id) => {
        console.log(id);
        setOpenAlert(false);
        apiManager.deleteUser(id).then(() => {
            window.location.reload();
        });
    }

    return(
        <>
            <Grid item xs={12}>
                <Row className={styles.backUser}>
                    <Col>{data.firstName}</Col>
                    <Col>{data.lastName}</Col>
                    <Col>{data.email}</Col>
                    <Col className={styles.backButtonUser}>
                        <Button color="primary" variant="contained" onClick={() => handleShowAddress()}>
                        Address
                        </Button>
                        <Modal show={openAddress} onHide={() => handleClose()} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Address</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{data.address}</Modal.Body>
                            <Modal.Body>{data.country}</Modal.Body>
                            <Modal.Footer>
                                <Button color="secondary" onClick={() => handleClose()}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </Col>
                    <Col>
                        <Button color="secondary" variant="contained" onClick={() => handleShowEdit()}>
                            Edit
                        </Button>
                        <Modal show={openEdit} onHide={() => handleClose()} animation={false}>
                            <EditUserModal handleClose={() => handleClose()} data={data} />
                        </Modal>
                    </Col>
                    <Col>
                        <Button color="secondary" variant="contained" onClick={() => showAlert(data.id)}>
                            Delete
                        </Button>
                        <Dialog open={openAlert} onClose={() => handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"Deletion"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to delete user {data.id}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleClose()} color="primary" variant="contained">
                                    Cancel
                                </Button>
                                <Button onClick={() => deleteUser(data.id)} color="secondary" variant="contained" autoFocus>
                                    Delete user
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Col>
                </Row>
            </Grid>
        </>
    )
};

const User = ({ userList }) => {
    const [list, setList] = useState([]);

    const buildList = useCallback(() => {
        if (userList) {
            const arr = []
            userList.forEach((order) => {
                arr.push(<UserBody key={order.id} data={order}/>)
            })
            setList(arr);
        }
    }, [userList]);

    useEffect(() => {
        buildList();
    }, [buildList]);

    return (
        <>
            <UserHeader/>
            {list}
        </>

    )
}
    export default User;
