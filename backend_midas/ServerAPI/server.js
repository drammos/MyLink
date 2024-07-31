const express = require('express');
const bodyParser = require('body-parser');
const sql = require('msnodesqlv8');
const cors = require('cors');

// Create express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Configuration for SQL Server connection
/*const config = {
  user: 'RemoteUser',
  password: 'Remote1!',
  server: 'localhost\\SQLEXPRESS',
  database: 'UsersDB',
};*/

const config = {
  server: 'localhost\\SQLEXPRESS',
  database: 'UsersDB',
  options: {
    trustedConnection: true,
  },
};

const connectionString = "server=localhost\\SQLEXPRESS;Database=UsersDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";


// API endpoint for user authentication
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("New connection with credentials:",username," , ",password)
  const query = `SELECT * FROM UsersDB.dbo.Users WHERE UserName = '${username}' AND Password = '${password}'`;

  try {

      sql.query(connectionString, query, (err, rows) => {
        if (err) {
          console.error(err);
          console.error(query);
          res.status(500).json({ success: false, message: 'Internal server error' });

          return;
        }
        console.log(rows);
        if (rows && rows.length > 0) {
          // User exists and credentials are correct
          res.json({ success: true });
        } else {
          // User doesn't exist or credentials are incorrect
          res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
      });
  
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } 
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});