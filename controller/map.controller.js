const db = require("../models");
const Employee = db.employee;
const Client = db.client;

// mapping with client
exports.mapClients = async (req, res) => {
  try {
    const empId = req.query.empId;
    const clientIds = req.query.clientIds.split(" ");

    const curEmp = await Employee.findOne({ where: { employeeId: empId } });
    console.log(curEmp);

    for (const id of clientIds) {
      const curClient = await Client.findOne({ where: { clientId: id } });
      await curClient.addEmployee(curEmp);
    }

    res.send({ empId, clientIds });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

// getting all clients associated with employee.
exports.findAllClients = async (req, res) => {
  try {
    const empId = req.query?.empId;
    await Employee.findAll({
      where: {
        employeeId: empId,
      },
      include: Client,
    })
      .then((data) => {

        //assoicatied clients array.
        data = data[0].clients;
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
