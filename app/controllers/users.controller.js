const db = require("../models");
const Users = db.users;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.role) {
        res.status(400).send({ code: 400, message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const user = new Users({
        email: req.body.email ? req.body.email : '',
        phonenumber: req.body.phonenumber ? req.body.phonenumber : '',
        gender: req.body.gender ? req.body.gender : '',
        role: req.body.role,
        expire_time: req.body.expire_time ? req.body.expire_time : '',
        status: 'active',
        name: req.body.name ? req.body.name : '',
        is_active: req.body.is_active ? req.body.is_active : '',
    });

    // Save Tutorial in the database
    user
        .save(user)
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
    const roleFilter = req.query.role;
    const isActiveFilter = req.query.is_active;
    const statusFilter = req.query.status;

    let condition = {};
    if(roleFilter) condition.role = { $eq: roleFilter };
    if(isActiveFilter) condition.is_active = { $eq: isActiveFilter };
    if(statusFilter) condition.status = { $eq: statusFilter };

    Users.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.role) {
        res.status(400).send({ code: 400, message: "Content can not be empty!" });
        return;
    }

    const id = req.params.id;

    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};
