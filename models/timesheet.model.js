module.exports = (sequelize, Sequelize) => {
  const Timesheet = sequelize.define(
    "timesheet",
    {
      year: {
        type: Sequelize.INTEGER,
      },
      month: {
        type: Sequelize.STRING,
      },
      week: {
        type: Sequelize.INTEGER,
      },
      monday: {
        type: Sequelize.INTEGER,
      },
      tuesday: {
        type: Sequelize.INTEGER,
      },
      wednessday: {
        type: Sequelize.INTEGER,
      },
      thursday: {
        type: Sequelize.INTEGER,
      },
      friday: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );
  return Timesheet;
};
