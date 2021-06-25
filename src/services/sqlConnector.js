var sql = require('mssql');
var request

const initSql = (req, res) => {
    // config for your database
    var config = {
        user: 'API',
        password: '123Back',
        server: 'sql.morse-messenger.com',
        database: 'CESIEAT',
        options: {
            trustServerCertificate: true,
        },
    };

    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        request = new sql.Request();
    })
}
/* 
const getUser = () => {
    // query to the database and get the records
    request.query('select * from Users', function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        console.log(recordset)
    });

};
*/
const getRequest = () => request

module.exports = {
    initSql,
    getRequest
};
