const { employee } = require("../models");
const db = require("../models");
const Timesheet = db.timesheet;
const Employee = db.employee;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    let { employeeId, year, month, week, monday, tuesday, wednessday, thursday, friday, total } = req.body;
    console.log({ body: employeeId });
    month = month.toLowerCase();
    const data = await Timesheet.create({
      employeeId,
      year,
      month,
      week,
      monday,
      tuesday,
      wednessday,
      thursday,
      friday,
      total,
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const timesheet = req.query?.timesheet;
    let condition = timesheet ? { timesheet: { [Op.like]: `%${timesheet}%` } } : null;
    await Timesheet.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving timesheets.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.findAllByWeek = async (req, res) => {
  try {
    const week = req.query?.week;
    const month = req.query?.month;
    const year = req.query?.year;

    await Timesheet.findAll({
      where: {
        [Op.and]: [{ year: year }, { month: month }, { week: week }],
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).send({
          message: "week not found",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// delete by id:
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Timesheet.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `Timesheet record having id ${id} deleted successfully!`,
          });
        } else {
          res.send({
            message: `Cannot delete Timesheet record with id=${id}. Maybe this record doesn't exists in timesheet!`,
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

// Update timesheet
exports.update = (req, res) => {
  try {
    const id = req.params?.id;
    Timesheet.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Timesheet updated.",
          });
        } else {
          res.send({
            message: `Cannot update timesheet with id=${id}. Maybe req.body is empty for this or Timesheet not found for this id!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating timesheet with id=" + id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.getEmployeeTimesheet = async (req, res) => {
  try {
    const empId = req.params.id;
    await Timesheet.findAll({
      where: { employeeId: empId },
      include: Employee,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `something went wrong while fetching all records of employee with ID ${empId}`,
        });
      });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
