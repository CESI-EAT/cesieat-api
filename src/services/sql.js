const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CESIEAT', 'Admin', 'poiuytr', {
  dialect: 'mssql',
  host: 'sql.morse-messenger.com',
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQL connected !');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }
  sequelize.sync();
};

module.exports = {
  connect,
  sequelize,
  request: sequelize.query,
};
