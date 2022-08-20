const db = require("../models");
const uid = require("uniqid");
const Client = db.client;
const Op = db.Sequelize.Op;
const DataTypes = require("sequelize");
// Create and Save a new Client
exports.create = async (req, res) => {
  try {
    const { clientName, emailAddress, phone, address, status, clientAddedDate } = req.body;

    if (clientName == null || emailAddress == null || phone == null || address == null || status == null) {
      res.status(400).send("not a valid field");
      return;
    }

    // generate unique id everytime for each client starting with their first name...
    const clientId = uid(clientName.split(" ")[0]);

    const data = await Client.create({
      clientName,
      emailAddress,
      phone,
      clientId,
      address,
      status,
      clientAddedDate,
    });

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Retrieve all Clients from the database.
exports.findAll = async (req, res) => {
  try {
    const client = req.query?.client;
    let condition = client ? { client: { [Op.like]: `%${client}%` } } : null;
    await Client.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Clients.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Find a single Client with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params?.id;
    await Client.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Client with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Client with id=" + id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  try {
    const id = req.params.id;
    Client.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Client was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Client with id=" + id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Client.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Client was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Client with id=${id}. Maybe Client was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Client with id=" + id,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  try {
    Client.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Clients were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all Clients.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Find single client by clientId
exports.findbyClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    Client.findOne({ where: { clientId: clientId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Something went wrong while retrieving client with client id= ${clientId} `,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Find all active Clients
exports.findAllActive = (req, res) => {
  try {
    Client.findAll({ where: { status: "active" } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Clients.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Find all inactive Clients
exports.findAllInactive = (req, res) => {
  try {
    Client.findAll({ where: { status: "inactive" } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Clients.",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
