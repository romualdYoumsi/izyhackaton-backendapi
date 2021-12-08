const db = require("../models");
const CryptoLogo = db.cryptologo;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.symbol) {
        res.status(400).send({ code: 400, message: "Bad request body!" });
        return;
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ code: 400, message: "No files were uploaded." });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.logo;

    let fileFormat = sampleFile.name.split('.');
    const fileExt = fileFormat[fileFormat.length-1];
    const filepath = "assets/img/"+req.body.symbol+"_"+Date.now()+"."+fileExt;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(filepath, function(err) {
        if (err)
            return res.status(500).send(err);

        // Create a Tutorial
        const cryptoLogo = new CryptoLogo({
            format: fileExt,
            logo: filepath,
            symbol: req.body.symbol ? req.body.symbol : '',
            name: req.body.name ? req.body.name : '',
        });

        // Save Tutorial in the database
        cryptoLogo
            .save(cryptoLogo)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the CryptoLogo."
                });
            });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    let condition = {};

    CryptoLogo.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SystemVariables."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CryptoLogo.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found CryptoLogo with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving CryptoLogo with id=" + id });
        });
};

// Find a single Tutorial with an id
exports.downloadOne = (req, res) => {
    const id = req.params.id;

    CryptoLogo.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found CryptoLogo with id " + id });
            else {

                let filePath = data.logo; // Or format the path using the `id` rest param
                let fileNameArr = filePath.split('/'); // The default name the browser will use
                let fileName = fileNameArr[fileNameArr.length-1];

                res.download(filePath, fileName);
                // res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving CryptoLogo with id=" + id });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    CryptoLogo.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete CryptoLogo with id=${id}. Maybe CryptoLogo was not found!`
                });
            } else {
                res.send({
                    message: "CryptoLogo was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete CryptoLogo with id=" + id
            });
        });
};
