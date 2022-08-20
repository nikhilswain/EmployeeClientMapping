module.exports = (app) => {
  const router = require("express").Router();
  const Timesheet = require("../controller/timesheet.controller");

  // employeeId => id of employee
  // employee id => primary key id of the employee table.

  // route to create timesheet
  // @ employee id ( id of the table(primary key) not the employeeId) will be filled in this as a foriegn key
  router.post("/", Timesheet.create);

  // Retrieve all Timesheet
  router.get("/", Timesheet.findAll);

  // route to find timesheet of a particular week
  // @API http://localhost:3000/api/timesheet/week?year=2022&month=august&week=1
  router.get("/week", Timesheet.findAllByWeek);

  // route to get all weeks of a employee
  // @ done with employee id as parameter
  router.get("/employee/:id", Timesheet.getEmployeeTimesheet);

  // update timesheet by a pariticular id
  router.put("/:id", Timesheet.update);

  // Delete a particular id
  router.delete("/:id", Timesheet.delete);

  app.use("/api/timesheet", router);
};
