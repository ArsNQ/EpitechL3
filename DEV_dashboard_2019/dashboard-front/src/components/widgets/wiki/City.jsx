import React, {useEffect, useState} from "react";

const City = ({data = {}}) => {

    return (
        <>
            <h1>{data.name}</h1>
            <h2>Postal code : {data.postalCode}</h2>
            <h2>Website : {data.website}</h2>
        </>
    )
};
export default City;
