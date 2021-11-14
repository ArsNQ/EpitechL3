import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import EditOrder from '../editOrder/editOrder';

const EditOrderModal = ({ handleClose, data }) => {
    return (
        <>
        <Modal.Header closeButton>
            <Modal.Title>Edit order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditOrder data={data} handleClose={() => handleClose()}/>
        </Modal.Body>
        <Modal.Footer>
            <Button color="secondary" onClick={() => handleClose()}>
                Close
            </Button>
        </Modal.Footer>

        </>
    )
}

export default EditOrderModal;