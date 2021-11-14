import React from 'react';
import Person from "./Person";
import City from "./City";

export const Component = ({data}) => {
    console.log(data);
    if (!data) return null;
    if (data.birthDate) {
        return <Person {...{data}} />
    }
    if (data.postalCode) {
        return <City {...{data}} />
    }

    return <h1>Please enter a city or person</h1>;
};