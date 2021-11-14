import express from 'express';
import Users from "../models/Users";

const router = new express.Router();

router.get('/user/:id', (req, res) => {
    Users.findById(req.params.id, function (err, user) {
        res.status(200).send(user);
    });
});

router.post('/changeService', (req, res) => {
    const {service, state, id } = req.body;
    return Users.findById(id).then((doc) => {
        if (doc.service[service]) {
            doc.service[service].enabled = state;
        } else {
            doc.service[service] = {
                enabled: state
            }
        }
        doc.markModified('service');
        return doc.save(function (err, user) {
            if (err) return console.error(err);
            return res.status(200).send(user.service);
        });
    });
});

router.post('/weatherLocation/:id', (req, res) => {
    return Users.findById(req.params.id).then((doc) => {
        if (!doc?.service?.weather) {
            return res.status(401).send({message: 'unauthorize'})
        }
        if (!doc.service?.weather?.locations) {
            doc.service.weather.locations = [];
        }
        const isNew = doc.service.weather.locations.findIndex((item) => item.code === req.body.code) === -1;
        if (!isNew ) {
            return res.status(409).send({
                status: 'error',
                message: 'This city is already registered in your profile',
            });
        }
        doc.service.weather.locations.push(req.body);

        doc.markModified('service');
        return doc.save(function (err, user) {
            if (err) return console.error(err);
            return res.status(200).send(user.service);
        });

    }).catch((err) => res.status(500).send(err));
});

router.delete('/weatherLocation/:id/:code', (req, res) => {
    Users.findById(req.params.id)
        .then((doc) => {
            doc.service.weather.locations.forEach((value, index) => {
                if (value.code === req.params.code) {
                    doc.service.weather.locations.splice(index, 1);
                }
            });
            doc.markModified('service');
            doc.save(function (err, user) {
                if (err) return console.error(err);
                res.status(200).send(user.service);
            });
        })
        .catch((err) => res.status(500).send(err));
});

router.post('/newsLocation/:id', (req, res) => {
    return Users.findById(req.params.id).then((doc) => {
        if (!doc?.service?.news) {
            return res.status(401).send({message: 'unauthorize'})
        }
        if (!doc.service?.news?.locations) {
            doc.service.news.locations = [];
        }
        const isNew = doc.service.news.locations.findIndex((item) => item.code === req.body.code) === -1;
        if (!isNew ) {
            return res.status(409).send({
                status: 'error',
                message: 'This country is already registered in your profile',
            });
        }
        doc.service.news.locations.push(req.body);

        doc.markModified('service');
        return doc.save(function (err, user) {
            if (err) return console.error(err);
            return res.status(200).send(user.service);
        });

    }).catch((err) => res.status(500).send(err));
});


router.delete('/newsLocation/:id/:code', (req, res) => {
    Users.findById(req.params.id)
        .then((doc) => {
            doc.service.news.locations.forEach((value, index) => {
                if (value.code === req.params.code) {
                    doc.service.news.locations.splice(index, 1);
                }
            });
            doc.markModified('service');
            doc.save(function (err, user) {
                if (err) return console.error(err);
                res.status(200).send(user.service);
            });
        })
        .catch((err) => res.status(500).send(err));
});

router.post('/add_category', (req, res) => {
    const {services, category, _id} = req.body;
    Users.findById(_id)
        .then((doc) => {
            doc.dashboard[category] = {
                services
            };
            doc.markModified('dashboard');
            return doc.save()
                .then((user) => {
                    return res.status(200).send({
                        dashboard: user.dashboard,
                        message: 'new category successfully added'
                    });
                })
                .catch(() => res.status(500).send({status: 500, message: 'internal server error while saving parameters'}))
        })
        .catch((err) => res.status(500).send({status: 500, message: 'internal server error'}))
});

router.post('/delete_category', (req, res) => {
    const { category, _id} = req.body;
    Users.findById(_id)
        .then((doc) => {
            delete doc.dashboard[category];
            doc.markModified('dashboard');
            return doc.save()
                .then((user) => {
                    return res.status(200).send({
                        dashboard: user.dashboard,
                        message: 'Category successfully deleted'
                    });
                })
                .catch(() => res.status(500).send({status: 500, message: 'internal server error while saving parameters'}))
        })
        .catch((err) => res.status(500).send({status: 500, message: 'internal server error'}))
});


export default router;
