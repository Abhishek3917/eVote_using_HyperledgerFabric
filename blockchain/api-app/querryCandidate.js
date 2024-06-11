const express = require('express');
const { exec } = require('child_process');
require('dotenv').config();
const app = express();

const port = process.env.PORT
app.get('/getAllCandidates', (req, res) => {
  const queryCommand = `peer chaincode query -C mychannel -n basic -c '{"function":"GetAllCandidates","Args":[]}'`;

  exec(queryCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Query error: ${error.message}`);
      return res.status(500).send('Query failed');
    }
    if (stderr) {
      console.error(`Query stderr: ${stderr}`);
      return res.status(500).send('Query failed');
    }
    
    const queryResult = JSON.parse(stdout);
    res.send(queryResult);
  });
});

app.listen(port , () => {
  console.log(`Server running at http://localhost:${port }`);
});