import React, { useState, useEffect } from 'react';
import { MDBInput, MDBCol } from "mdbreact";
import styles from "./search.module.css";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/esm/Dropdown";
import apiManager from '../../../http/apiManager';

const Search = ({ onSearch, onSelect }) => {
    const [searchVal, setSearchVal] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let tmp = []
        apiManager.getCategories().then((res) => {
            console.log(res.data);
            res.data.forEach((elem) => {
                tmp.push(<Dropdown.Item key={elem.id} eventKey={elem.id} >{elem.name}</Dropdown.Item>)
            })
            setCategories(tmp);
        })
    }, []);

    return(
        <>
            <div className={styles.mySearchBar}>
                <Dropdown onSelect={(eventKey) => onSelect(eventKey) }>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Categories
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        {categories}
                    </Dropdown.Menu>
                </Dropdown>
                <MDBCol md="6">
                    <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={(e) => setSearchVal(e.target.value)} />
                </MDBCol>
                <Button variant="dark" onClick={() => onSearch(searchVal)}>Search</Button>
            </div>
        </>
    )
};

export default Search;

