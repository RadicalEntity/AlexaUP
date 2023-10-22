const serviceAccountKeyPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountKeyPath) {
  console.error('SERVICE_ACCOUNT_KEY_PATH environment variable is not set.');
  process.exit(1); // Exit the application if the variable is not set
}

const serviceAccount = require(serviceAccountKeyPath);
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://alexauserprofiles-default-rtdb.firebaseio.com/',
});

const db = admin.database();

// Add middleware to parse JSON data
app.use(bodyParser.json());

app.get('/getUser', (req, res) => {
  const userResponse = req.query.response;
  
  if (userResponse === 'Rachel') {
    res.json({ user: 'user1' });
  } else if (userResponse === 'Maria') {
    res.json({ user: 'user2' });
  } else {
    res.status(400).json({ error: 'Invalid user response' });
  }
});

app.get('/getUserLanguage', (req, res) => {
  const userValue = req.query.user;

  // Assuming you are using Firebase Realtime Database
  const usersRef = db.ref(); // Reference to the root of the database

  // Query Firebase for the user data based on the user value
  usersRef
    .orderByKey() // Assuming user1 and user2 are keys
    .equalTo(userValue)
    .once('value', (snapshot) => {
      const matchingUsers = snapshot.val();

      if (matchingUsers) {
        // Extract the user data for the matching user
        const userData = matchingUsers[userValue];

        if (userData) {
          // Extract the language property from the user data
          const userLanguage = userData.language;

          if (userLanguage) {
            res.json({ language: userLanguage });
          } else {
            res.status(400).json({ error: 'Language property not found for the user' });
          }
        } else {
          res.status(400).json({ error: 'User data not found for the user' });
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

