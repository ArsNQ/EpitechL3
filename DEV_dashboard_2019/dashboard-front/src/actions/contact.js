import {openNotification} from "./notifications";

export const contactForm = (form) => {
    return fetch( "https://formspree.io/mgelbdzk", {
        method: "POST",
        body: new FormData(form)
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
};