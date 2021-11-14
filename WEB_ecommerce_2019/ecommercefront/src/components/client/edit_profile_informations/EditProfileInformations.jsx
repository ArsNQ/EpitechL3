import React, {useEffect, useState} from 'react';
import apiManager from '../../../http/apiManager';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner";

const EditProfileInformations = ({ data }) => {
    const [User, setUser] = useState();
    const [Email, setEmail] = useState();
    const [FirstName, setFirstName] = useState();
    const [LastName, setLastName] = useState();
    const [Address, setAddress] = useState();
    const [Country, setCountry] = useState();

    const submitForm = event => {
        event.preventDefault();
        let send = {
            email: Email,
            firstName: FirstName,
            lastName: LastName,
            address: Address,
            country: Country
        }

        apiManager.editUser(User.id, send).then((res) => {
            console.log(res.data);
        });
    }

    useEffect(() => {
        if (!data) {
            apiManager.getUser().then((res) => {
                setUser(res.data[0]);
                setEmail(res.data[0].email);
                setFirstName(res.data[0].firstname);
                setLastName(res.data[0].lastname);
                setAddress(res.data[0].address);
                setCountry(res.data[0].country);
            })
        } else {
            setUser(data);
            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setAddress(data.address);
            setCountry(data.country);
        }
    }, [data]);

    if (User) {
        return (
            <>
                <Form onSubmit={e => submitForm(e)} >
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={Email} required onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="firstname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control value={FirstName} required onChange={e => setFirstName(e.target.value)} type="text" placeholder="First name" />
                    </Form.Group>

                    <Form.Group controlId="lastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control value={LastName} required onChange={e => setLastName(e.target.value)} type="text" placeholder="Last name" />
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={Address} required onChange={e => setAddress(e.target.value)} type="text" placeholder="Address" />
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={Country} required onChange={e => setCountry(e.target.value)} type="text" placeholder="Country" />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        );
    } else {
        return (<Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }
}

export default EditProfileInformations;
