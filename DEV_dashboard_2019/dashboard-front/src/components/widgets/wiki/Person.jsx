import React, {useEffect, useState} from "react";

const Person = ({data = {}}) => {
    console.log('data', data);
    const [birthdate, setBirthdate] = useState("");

    useEffect(() => {
        let tmpDate = "";
        const date = data.birthDate.date;
        if (date.getDate() < 10) {
            tmpDate = tmpDate + "0" + date.getDate();
        } else {
            tmpDate = tmpDate + date.getDate();
        }

        if (date.getMonth() < 10) {
            tmpDate = tmpDate + "/0" + date.getMonth();
        } else {
            tmpDate = tmpDate + "0" + date.getMonth();
        }

        tmpDate = tmpDate + "/" + date.getFullYear();
        setBirthdate(tmpDate);
        console.log("birthdate", data.birthDate.date.getFullYear());
    }, [])

    return (
        <>
            <h1>{data.name}</h1>
            <h2>Birthdate : {birthdate}</h2>
            <h2>Birthplace : {data.birthPlace}</h2>
            <h2>Children : {data.children}</h2>
        </>
    )
};
export default Person;
