module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    clientName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    clientId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    clientAddedDate: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.DataTypes.NOW,
    },
  });
  return Client;
};
