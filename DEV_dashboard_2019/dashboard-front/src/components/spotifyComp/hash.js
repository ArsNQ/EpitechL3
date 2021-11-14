import React, { Component } from "react";
import "./App.css";export const authEndpoint = '71065ebe26e54f9fbcb24c05da4a382f';

const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = "";

export default hash;