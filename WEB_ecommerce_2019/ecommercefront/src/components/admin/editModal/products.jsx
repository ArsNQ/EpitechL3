import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import EditProduct from '../editProduct/editProduct';

const EditProductModal = ({ handleClose, data }) => {
    return (
        <>
        <Modal.Header closeButton>
            <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditProduct data={data} handleClose={() => handleClose()}/>
        </Modal.Body>
        <Modal.Footer>
            <Button color="secondary" onClick={() => handleClose()}>
                Close
            </Button>
        </Modal.Footer>
        </>
    )
}

export default EditProductModal;
