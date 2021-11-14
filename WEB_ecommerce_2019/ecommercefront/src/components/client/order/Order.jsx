import React, {useCallback, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import {Col, Row, Modal} from "react-bootstrap";
import styles from "../order/order.module.css"
import { FaCalendarAlt } from "react-icons/fa";
import EditOrderModal from '../../admin/editModal/orders';
import apiManager from "../../../http/apiManager";

const OrderHeader = () => {
    return(
        <Row className={styles.backOrder2}>
            <Col><FaCalendarAlt className={styles.myCal}/> Date</Col>
            <Col>Reference order</Col>
            <Col>Price </Col>
            <Col>Status</Col>
            <Col>Details</Col>
            <Col>Edit</Col>
            <Col>Delete</Col>
        </Row>
    )
};

const OrderBody = ({ data }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const handleClose = () => setOpenEdit(false);
    const handleEdit = () => setOpenEdit(true);

    const handleDelete = (e) => {
        apiManager.deleteOrder(data.id).then((res) => {
            console.log(res.data);
        });
    };

    const showAlert = () => setOpenAlert(true);

    const deleteOrder = (id) => {
        console.log(id);
        setOpenAlert(false);
        apiManager.deleteOrder(id).then(() => {
            window.location.reload();
        });
    }

    return(
        <>
            <Grid item xs={12}>
                <Row className={styles.backOrder}>
                    <Col>{new Date(data.date).toUTCString()}</Col>
                    <Col>Order No {data.id}</Col>
                    <Col>Total Price {data.total}</Col>
                    <Col>Status {data.status}</Col>
                    <Col className={styles.backButtonOrder}><Button variant="contained" color="primary">Detail</Button></Col>
                    <Col className={styles.backButtonOrder}><Button variant="contained" color="secondary" onClick={() => handleEdit()}>Edit</Button></Col>
                    <Col>
                        <Button color="secondary" variant="contained" onClick={() => showAlert(data.id)}>
                            Delete
                        </Button>
                        <Dialog open={openAlert} onClose={() => handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"Deletion"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to delete order {data.id}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleClose()} color="primary" variant="contained">
                                    Cancel
                                </Button>
                                <Button onClick={() => deleteOrder(data.id)} color="secondary" variant="contained" autoFocus>
                                    Delete order
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Col>
                </Row>
            </Grid>
            <Modal show={openEdit} size="xl" onHide={() => handleClose()} animation={false}>
                <EditOrderModal handleClose={() => handleClose()} data={data} />
            </Modal>
        </>
    )
};

const Order = ({ orderList }) => {
    const [list, setList] = useState([]);

    const buildList = useCallback(() => {
        if (orderList) {
            const arr = []
            orderList.forEach((order) => {
                arr.push(<OrderBody key={order.id} data={order} />)
            })
            setList(arr);
        }
    }, [orderList]);

    useEffect(() => {
        buildList();
    }, [buildList]);

    return(
        <>
            <OrderHeader />
            {list}
            </>
    )

};

export default Order;

