const serviceAccountKeyPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountKeyPath) {
  console.error('SERVICE_ACCOUNT_KEY_PATH environment variable is not set.');
  process.exit(1); // Exit the application if the variable is not set
}

const serviceAccount = require(serviceAccountKeyPath);

const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://alexauserprofiles-default-rtdb.firebaseio.com/', // Replace with your database URL
});

app.post('/store-data', (req, res) => {
    const data = req.body; // Data sent from Voiceflow
    const db = admin.database();
    const ref = db.ref('users');
  
    ref.push(data, (error) => {
      if (error) {
        res.status(500).send('Data could not be saved.');
      } else {
        res.status(200).send('Data saved successfully.');
      }
    });
  });

  
const user1 = {
  name: 'Rachel',
  email: 'john@example.com',
};
  
const user2 = {
  name: 'Maria',
  email: 'jane@example.com',
};

const user1Ref = db.ref('users/user1');
const user2Ref = db.ref('users/user2');
  
user1Ref.set(user1);
user2Ref.set(user2);
  