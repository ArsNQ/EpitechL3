import React, { useState } from 'react';
import apiManager from '../../../http/apiManager';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

const EditProduct = ({ data, handleClose }) => {
    const [name, setName] = useState(data.name);
    const [price, setPrice] = useState(data.price);
    const [description, setDescription] = useState(data.description);
    const [color, setColor] = useState(data.color);
    const [homepage, setHomepage] = useState(data.homepage);
    const [weight, setWeight] = useState(data.weight);
    const [quantity, setQuantity] = useState(data.quantity);
    console.log(data);

    const submitForm = event => {
        event.preventDefault();
        let send = {
            name: name,
            price: price,
            description: description,
            color: color,
            homepage: homepage,
            weight: weight,
        };
        apiManager.editProduct(data.id, send).then(() => {
            apiManager.editStock(data.id, quantity).then(() => {
                handleClose();
                window.location.reload();
            });
        })
    }

        return (
            <>
                <Form onSubmit={e => submitForm(e)} >
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} required onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description} required onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
                    </Form.Group>
                    <Form.Group controlId="homepage">
                        <Form.Label>Homepage</Form.Label>
                        <Form.Control value={homepage} required onChange={(e) => setHomepage(e.target.value)} type="text" placeholder="Homepage" />
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={price} required onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Price" />
                        </Form.Group>
                        <Form.Group controlId="weight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control value={weight} required onChange={(e) => setWeight(e.target.value)} type="text" placeholder="Weight" />
                        </Form.Group>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control value={quantity} required onChange={(e) => setQuantity(e.target.value)} type="text" placeholder="Quantity" />
                        </Form.Group>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>

            </>
        );
}

export default EditProduct;
