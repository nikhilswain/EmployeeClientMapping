const db = require("../models");
const Employee = db.employee;
const Timesheet = db.timesheet;
const Op = db.Sequelize.Op;

// Create and Save a new employee
exports.create = async (req, res) => {
  try {
    const { employeeName, employeeId, emailAddress, status } = req.body;
    console.log({ employeeName, employeeId, emailAddress, status });

    if (employeeName == null || emailAddress == null || employeeId == null || status == null) {
      res.status(400).send("some field is not valid!");
      return;
    }

    const data = await Employee.create({
      employeeName,
      emailAddress,
      employeeId,
      status,
    });

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Retrieve all employees from the database.
exports.findAll = async (req, res) => {
  try {
    const employee = req.query?.employee;
    let condition = employee ? { employee: { [Op.like]: `%${employee}%` } } : null;
    await Employee.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving employees.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
// Find a single employee with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params?.id;
    await Employee.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find employee with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving employee with id=" + id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Update a employee by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params?.id;
    await Employee.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "employee was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating employee with id=" + id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a employee with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Employee.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "employee was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete employee with id=${id}. Maybe employee was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete employee with id=" + id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
// Delete all employees from the database.
exports.deleteAll = async (req, res) => {
  try {
    await Employee.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} employees were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all employees.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Find all active employees
exports.findAllActive = async (req, res) => {
  try {
    await Employee.findAll({ where: { status: "active" } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving employees.",
        });
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err);
  }
};
// Find all inactive employees
exports.findAllInactive = async (req, res) => {
  try {
    await Employee.findAll({ where: { status: "inactive" } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving employees.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.timesheet = async (req, res) => {
  try {
    const empId = req.params?.id;
    console.log({ empId });
    await Employee.findAll({
      where: {
        id: empId,
      },
      include: Timesheet,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: err.message || "something went wrong while fetching data",
        });
      });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
