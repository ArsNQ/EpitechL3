import React, {useEffect, useState} from 'react';
import apiManager from '../../../http/apiManager';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const EditOrder = ({ data, handleClose }) => {
    console.log(data);
    const [Total, setTotal] = useState(data.total.toString());
    const [Status, setStatus] = useState(data.status);

    const submitForm = event => {
        event.preventDefault();
        let send = {
            total: Total,
            status: Status
        }

        apiManager.editOrder(data.id, send).then((res) => {
            handleClose();
            window.location.reload();
            console.log(res.data);
        });
    }

    const handleChange = event => {
      setStatus(event.target.value);
    };

        return (
            <>
                <Form onSubmit={e => submitForm(e)} >
                    <Form.Group controlId="status">
                        <Select
                            value={Status}
                            onChange={event => handleChange(event)}
                            inputProps={{
                                name: 'status',
                                id: 'status',
                            }}
                        >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                        </Select>
                    </Form.Group>

                    <Form.Group controlId="prix">
                        <Form.Label>Prix total</Form.Label>
                        <Form.Control value={Total} required onChange={e => setTotal(e.target.value)} type="text" placeholder="Total" />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        );
}

export default EditOrder;
