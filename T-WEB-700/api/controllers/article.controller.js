const express = require("express");
const Article = require("../models/article");
const Crypto = require("../models/crypto")
const router = express.Router();

// Get one article with filter
router.get("", (req, res) => {
  const filters = req.query;

  Article.find(
    {
      $and: [filters],
    },
    function (err, foundArticle) {
      if (err) {
        return res.status(500).send({
          message: "Internal Server Error",
        });
      } else if (foundArticle) {
        return res.status(200).send(JSON.stringify(foundArticle));
      }
    }
  );
});

/*router.get("/cryptos", (req, res) => {
  const title = req.query.title;

  Crypto.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving tutorials."
        });
      });
});*/

// Get one article
router.get("/:id", (req, res) => {
  const idarticle = req.params.id;
  Article.findById(
    {
      _id: idarticle,
    },
    function (err, foundArticle) {
      if (err) {
        return res.status(500).send({
          message: "Internal Server Error",
        });
      } else if (foundArticle) {
        return res.status(200).send(JSON.stringify(foundArticle));
      }
    }
  );
});

module.exports = router;
