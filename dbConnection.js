const Connection = require('tedious').Connection;

const config = {
    server: 'localhost',
    authentication: {
      type: 'default',
      options: {
        userName: 'database-admin',
        password: 'Hounslow230'
      }
    },
    options: {
        port: 1433,
        database: 'ClockedOutDatabase',
        trustServerCertificate: true,
        useColumnNames: true
    }
  };

const GetConnection = function() {
  const connection = new Connection(config);

  connection.on('connect', () => {
      console.log("connected");
  })
  
  connection.on('end', () => {
    console.log("connection closed!");
  })
  return connection;
}


module.exports.GetConnection = GetConnection;