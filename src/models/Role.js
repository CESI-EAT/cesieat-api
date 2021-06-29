module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  // Role.associate = (models) => {
  //   Role.hasMany(models.User, { foreignKey: 'user_id', as: 'users' });
  // };

  return Role;
};
