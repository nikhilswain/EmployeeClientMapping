module.exports = (app) => {
  const mapping = require("../controller/map.controller");

  const router = require("express").Router();

  // http://localhost:3000/api/map?empId=luffgear4&clientIds=zerotwo4qm3i835l6w258yn%20chizuru4qm3i835l6w268k5
  router.get("/", mapping.mapClients);

  // get all clients assocaited with a single employee, 
  router.get("/clients", mapping.findAllClients);


  app.use("/api/map", router);
};
