// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyABhE4qBhf9Djz-wJPQ4E6lfqt77iN-nmg',
    authDomain: 'lendtome-93c5c.firebaseapp.com',
    databaseURL: 'https://lendtome-93c5c.firebaseio.com',
    projectId: 'lendtome-93c5c',
    storageBucket: 'lendtome-93c5c.appspot.com',
    messagingSenderId: '937784623563'
  },
  apiUrl: 'https://dev.lend-to.me/api',
};
