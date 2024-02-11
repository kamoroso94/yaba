// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: 'AIzaSyCorShCqZfvE16_tNyvygbfSy5o8EQFK0E',
  authDomain: 'yaba-0.firebaseapp.com',
  projectId: 'yaba-0',
  storageBucket: 'yaba-0.appspot.com',
  messagingSenderId: '297298616389',
  appId: '1:297298616389:web:2bc5edde8d9a8cdaf4032c',
});
const firebaseAuth = firebase.auth();

// FirebaseUI config.
const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // TODO: set up the following authentication methods.
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (/* authResult */) => {
      hideSignin();
      return false;
    },
    uiShown: () => {
      document.getElementById('loader-container').classList.add('d-none');
      showSignin();
    },
  },
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebaseAuth);
const firebaseuiAuthContainer = document.getElementById(
  'firebaseui-auth-container'
);
// The start method will wait until the DOM is loaded.
ui.start(firebaseuiAuthContainer, uiConfig);

const signoutButton = document.getElementById('signout');
const signinCard = document.getElementById('signin-card');
const routerOutlet = document.getElementById('router-outlet');

signoutButton.addEventListener('click', async () => {
  await firebaseAuth.signOut();
  showSignin();
  ui.start(firebaseuiAuthContainer, uiConfig);
});

function showSignin() {
  signoutButton.classList.replace('d-flex', 'd-none');
  signinCard.classList.remove('d-none');
  routerOutlet.classList.add('d-none');
}

function hideSignin() {
  signoutButton.classList.replace('d-none', 'd-flex');
  signinCard.classList.add('d-none');
  routerOutlet.classList.remove('d-none');
}

firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    hideSignin();
  } else {
    showSignin();
  }
});
