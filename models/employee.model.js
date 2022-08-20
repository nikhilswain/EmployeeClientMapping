module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    employeeName: {
      type: Sequelize.STRING,
    },
    emailAddress: {
      type: Sequelize.STRING,
    },
    employeeId: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
  return Employee;
};
