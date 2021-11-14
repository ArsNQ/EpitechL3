import {Col, Row} from "react-bootstrap";
import styles from "../../admin/users/user.module.css";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import EditProductModal from '../editModal/products';
import apiManager from "../../../http/apiManager";

const ProductHeader = () => {
    return(
        <Row className={styles.backUser2}>
            <Col>ID</Col>
            <Col>Product name</Col>
            <Col>Quantity</Col>
            <Col>Price</Col>
            <Col>Edit</Col>
            <Col>Delete</Col>
        </Row>
    )
};

const ProductBody = ({ data }) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [show, setShow] = useState(false);
    const showAlert = () => setOpenAlert(true);
    const handleClose = () => { setShow(false); setOpenAlert(false) };
    const handleShow = () => setShow(true);

    const deleteUser = (id) => {
        console.log(id);
        setOpenAlert(false);
        apiManager.deleteProduct(id).then(() => {
            window.location.reload();
        });
    }

    return(
        <>
            <Grid item xs={12}>
                <Row className={styles.backUser}>
                    <Col>{data.id}</Col>
                    <Col>{data.name}</Col>
                    <Col>{data.quantity}</Col>
                    <Col>{data.price}</Col>
                    <Col className={styles.backButtonUser}>
                        <Button color="secondary" variant="contained" onClick={handleShow}>
                            Edit
                        </Button>
                        <Modal show={show} onHide={() => handleClose()} animation={false}>
                            <EditProductModal handleClose={() => handleClose()} data={data} />
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
                                    Are you sure to delete product {data.id} ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleClose()} color="primary" variant="contained">
                                    Cancel
                                </Button>
                                <Button onClick={() => deleteUser(data.id)} color="secondary" variant="contained" autoFocus>
                                    Delete Product
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Col>
                </Row>
            </Grid>
        </>
    )
};

const Products = ({ productlist }) => {
    const [list, setList] = useState([]);

    const buildList = useCallback(() => {
        if (productlist) {
            const arr = []
            productlist.forEach((product) => {
                apiManager.getStocks(product.id).then((res) => {
                    arr.push(<ProductBody key={res.data[0].id} data={res.data[0]}/>)
                })
            })
            console.log("arr", arr);
            setList(arr);
        }
    }, [productlist]);

    useEffect(() => {
        buildList();
    }, [buildList]);

    if (list) {
        return (
            <>
                <ProductHeader/>
                {list}
            </>

        )
    }

    else {
        return (
            <>
                <ProductHeader/>
                loading
            </>
        )
    }

}
export default Products;
