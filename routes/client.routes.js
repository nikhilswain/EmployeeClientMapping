module.exports = (app) => {
  const clients = require("../controller/client.controller.js");
  const router = require("express").Router();

  // Create a new Client
  router.post("/", clients.create);

  // Retrieve all clients
  router.get("/", clients.findAll);

  // Retrieve all clients who're active
  router.get("/active", clients.findAllActive);

  // Retrieve all clients who're inactive
  router.get("/inactive", clients.findAllInactive);

  // Retrieve a single Client with id
  router.get("/:id", clients.findOne);

  // Retrieve a single client with clientId
  router.get("/clientId/:clientId", clients.findbyClientId);

  // Update a client with id
  router.put("/:id", clients.update);

  // Delete a client with id
  router.delete("/:id", clients.delete);

  // Delete all clients
  router.delete("/", clients.deleteAll);

  app.use("/api/clients", router);
};
