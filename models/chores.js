module.exports = function (sequelize, DataTypes) {
  var Chores = sequelize.define("Chores", {
    chore_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
      references: {
        model: 'Users', // Can be both a string representing the table name or a Sequelize model
        key: 'user_id'
      }
    },
    chore: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chore_state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    total_cal_burn: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  });
  return Activities;
};
