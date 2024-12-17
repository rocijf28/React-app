let firebaseExports;
if (process.env.REACT_APP_USE_EMULATORS === 'true') {
  firebaseExports = require('./firebase.test');
} else {
  firebaseExports = require('./firebase');
}

const { auth, db, googleProvider } = firebaseExports;
export { auth, db, googleProvider };