const sql = require("msnodesqlv8");
const express = require('express');
const app = express();

const connectionString = "server=localhost\\SQLEXPRESS;Database=UsersDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "SELECT * FROM UsersDB.dbo.Users";

sql.query(connectionString, query, (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(rows);
});


// app.listen(8081, () => {
//   console.log("Listening...");
// })

//const express = require('express');
// const app = express();
// const sql = require('mssql/msnodesqlv8');

// const config = {
//     user: 'RemoteUser', // Your SQL Server username
//     password: 'Remote1!', // Your SQL Server password
//     server: 'localhost\\SQLEXPRESS', // or the IP address of your SQL Server
//     database: 'UsersDB',
//     driver: 'msnodesqlv8'
//   };
  
//   // Create a pool of database connections
// const pool = new sql.ConnectionPool(config);
  
// // Function to connect to the database
// async function connect() {
//   try {
//     await sql.connect(config);
//     console.log('Connected to the database');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// }

// connect().then(() => {
//   console.log('Database connection established');
// }).catch((error) => {
//   console.error('Failed to connect to the database:', error);
// });


// module.exports = {
//   pool
// };

// async function viewTable(tableName) {
//   try {
//     const poolRequest = pool.request();
//     const result = await poolRequest.query(`SELECT * FROM ${tableName}`);

//     console.log(`Contents of table '${tableName}':`);
//     console.table(result.recordset);
//   } catch (error) {
//     console.error('Error executing SQL query:', error);
//   }
// }

// // Call the function to view the contents of a specific table
// viewTable('Users');