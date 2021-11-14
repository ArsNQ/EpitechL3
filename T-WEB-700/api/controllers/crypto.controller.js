const axios = require('axios')
const express = require('express');
const { checkAuthenticationAdmin } = require('../config/middleware');
const Crypto = require("../models/crypto");
const router = new express.Router();

router.get('/', async(req, res) => {
    var currency = "usd";
    if (req.user != undefined)
        currency = req.user.currency;
    Crypto.find({}, function(err, cryptos) {
        getCrypto(cryptos, currency).then(ress => {
            let filtered = ress.filter(function (el) {
                return el != null;
            });
            return res.status(200).send(filtered);
        })
    }).lean();
});

router.get(`/:id`, async (req, res) => {
    const cryptoID = req.params.id;
    var currency = "usd";
        if (req.user != undefined)
            currency = req.user.currency;
        Crypto.find({ cryptoID: { $regex: "^" + cryptoID, $options: "" }}, async function(err, foundCrypto) {
            if (err) {
                res.status(500).send({message: "Error"});
            }
            else if (foundCrypto) {
                getCrypto(foundCrypto, currency).then(ress => {
                    let filtered = ress.filter(function (el) {
                        return el != null;
                    });
                    return res.status(200).send(filtered);
                })
            }
    }).lean();
});

router.get('/value/allcryptos', async (req, res) => {
    const id = req.params.id
    return axios.get(`https://api.coingecko.com/api/v3/coins/`+id).then((resapi) => {
        res.status(200).send(resapi.data)
    })
        .catch((error) => console.log(error))
});

router.post("/", checkAuthenticationAdmin, (req, res) => {
    const cryptoNAME = req.body.cryptoNAME;
    const cryptoID = req.body.cryptoID;
    Crypto.findOne({ cryptoID: cryptoID }, function(err, foundCrypto) {
        if (foundCrypto) {
            return res.status(409).send({message: "error"})
        }
        else {
            Crypto.create ([{
                cryptoNAME,
                cryptoID,
            }], function(err) {
                if (err) {
                    res.status(500).send({message: "Error"});
                }
                else {
                    res.status(201).send({message: "Success"});
                }
            });
        }
    });
});

router.delete("/:id", checkAuthenticationAdmin, (req, res) => {
    const cryptoID =req.params.id;
    console.log(cryptoID)
    return Crypto.findOneAndRemove(({cryptoID: cryptoID}), function(err, foundCrypto) {
        if (err) {
            return res.status(500).send({ message:"Error"});
        } else if (foundCrypto) {
            return res.status(200).send({ message: "Success" });
        }
        return res.status(404).send({ message: "Not found"});
    })
});

const getValue = (id, currency) => {
    return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`)
        .then(function (response) {
            return response;
        })
};

const getHistory = (id, currency, time, CryptoInterval) => {
    var interval = '';
    if (CryptoInterval == true) {
        interval = '&interval=daily'
    }
    return axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${time}${CryptoInterval}`)
        .then(function(response) {
            return response;
        });
};

const getInterval = (crypto, currency, min = true) => {
    startingDate = new Date();
    untilDate = Date.now();
    actualDate = new Date(startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate());
    actualDate = actualDate / 1000;
    untilDate = untilDate / 1000;
    return axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart/range?vs_currency=${currency}&from=${actualDate}&to=${untilDate}`)
        .then(function(response) {
            var tmp = response.data.prices;
            var max = 0;
            var min = 0;

            tmp.forEach(element => {
                if (min == 0)
                    min = element[1];
                if (max < element[1]) {
                    max = element[1];
                }
                if (min > element[1]) {
                    min = element[1];
                }
            });
            return { 'min': min, 'max': max };
        })
};

const getInfo = (crypto) => {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}`)
        .then(function (res) {
            return res;
        })
}

const getCrypto = (crypto, currencyCrypto) => {
    let promises = [];
    crypto.map(async function(element) {
        promises.push(getValue(element.cryptoID, currencyCrypto).then(responsePrice => {
            element.currentPrice = responsePrice.data[element.cryptoID][currencyCrypto];
            element.currency = currencyCrypto;
        }));
         promises.push(getInfo(element.cryptoID).then(resInfoCrypto => {
            if (resInfoCrypto.data) {
                element.symbol = resInfoCrypto.data.symbol;
                element.rank = resInfoCrypto.data.market_cap_rank;
            }
        }));
        promises.push(getInterval(element.cryptoID, currencyCrypto).then(responseIntervalPrice => {
            element.min = responseIntervalPrice.min.toFixed(2);
            element.max = responseIntervalPrice.max.toFixed(2);
            return element;
        }))
    })
    return Promise.all(promises).then(res => {
        return res;
    });
};

module.exports = router;