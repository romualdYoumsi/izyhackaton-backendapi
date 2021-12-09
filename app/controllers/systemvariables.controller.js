const db = require("../models");
const SystemVariables = db.systemvariables;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.value || !req.body.code) {
        res.status(400).send({ code: 400, message: "Bad request body!" });
        return;
    }

    // Create a Tutorial
    const systemVariable = new SystemVariables({
        icon: req.body.icon ? req.body.icon : '',
        description: req.body.description ? req.body.description : '',
        code: req.body.code ? req.body.code : '',
        name: req.body.name ? req.body.name : '',
        value: req.body.value ? req.body.value : '',
    });

    // Save Tutorial in the database
    systemVariable
        .save(systemVariable)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    let condition = {};

    SystemVariables.find(condition)
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

    SystemVariables.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found SystemVariables with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving SystemVariables with id=" + id });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.value) {
        res.status(400).send({ code: 400, message: "Bad request body!" });
        return;
    }

    const id = req.params.id;

    SystemVariables.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update SystemVariables with id=${id}. Maybe SystemVariables was not found!`
                });
            } else res.send({ message: "System variable was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating SystemVariables with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SystemVariables.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete SystemVariables with id=${id}. Maybe SystemVariables was not found!`
                });
            } else {
                res.send({
                    message: "SystemVariables was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete SystemVariables with id=" + id
            });
        });
};
