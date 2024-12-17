// scripts/createTestUser.js
const admin = require('firebase-admin');

// Initialize de admin SDK zonder credentials (emulator omgevingen hebben dit niet nodig)
admin.initializeApp({
  projectId: 'testproject',
});

// Aangezien we in de emulator zitten, zorgen we dat de Admin SDK met de emulator praat.
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

admin.auth().createUser({
  uid: 'otterOrangeTestUser',
  displayName: 'Otter Orange',
  email: 'otterorange@example.com',
  password: 'testPassword123'
}).then((userRecord) => {
  console.log('Test user created:', userRecord.uid);
}).catch(console.error);