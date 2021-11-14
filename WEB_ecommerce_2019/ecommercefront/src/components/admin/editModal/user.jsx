import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import EditProfileInformations from '../../client/edit_profile_informations/EditProfileInformations';

const EditUserModal = ({ handleClose, data }) => {
    return (
        <>
        <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditProfileInformations data={data} />
        </Modal.Body>
        <Modal.Footer>
            <Button color="secondary" onClick={() => handleClose()}>
                Close
            </Button>
        </Modal.Footer>

        </>
    )
}

export default EditUserModal;