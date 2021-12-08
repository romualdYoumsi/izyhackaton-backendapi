module.exports = app => {
    const cryptologo = require("../controllers/cryptologo.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", cryptologo.create);

    // Retrieve all Tutorials
    router.get("/", cryptologo.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", cryptologo.findOne);

    // Retrieve a single Tutorial with id
    router.get("/:id/download", cryptologo.downloadOne);

    // Delete a Tutorial with id
    router.delete("/:id", cryptologo.delete);

    app.use('/api/cryptologo', router);
};
