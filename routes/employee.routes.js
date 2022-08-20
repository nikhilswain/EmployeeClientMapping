module.exports = (app) => {
  const employees = require("../controller/employee.controller.js");
  const router = require("express").Router();

  // Create a new employee
  router.post("/", employees.create);

  // Retrieve all employees
  router.get("/", employees.findAll);

  // Retrieve all employees who're active
  router.get("/active", employees.findAllActive);

  // Retrieve all employees who're inactive
  router.get("/inactive", employees.findAllInactive);

  // Retrieve a single employee with id
  router.get("/:id", employees.findOne);

  // Update a employee with id
  router.put("/:id", employees.update);

  // Delete a employee with id
  router.delete("/:id", employees.delete);

  // Delete all employees
  router.delete("/", employees.deleteAll);

  // find all working hours of a employee
  router.get("/timesheet/:id", employees.timesheet);

  app.use("/api/employees", router);
};
