module.exports = app => {
    const systemvariables = require("../controllers/systemvariables.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", systemvariables.create);

    // Retrieve all Tutorials
    router.get("/", systemvariables.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", systemvariables.findOne);

    // Update a Tutorial with id
    router.put("/:id", systemvariables.update);

    // Delete a Tutorial with id
    router.delete("/:id", systemvariables.delete);

    app.use('/api/systemvariables', router);
};
