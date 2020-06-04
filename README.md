This is my WorkOS challenge: a simple app that displays users from a slack workspace, stores them in a database, and updates as necessary when the users update as well.

## How this works

This project is a simple next.js app that has a single route, index.js to display the ui users in a slack workspace.

The backend is made up of next.js serverless functions, and consists of a single route which can be found in /pages/api/users. This api is connected to mongodb.

The api handles either GET requests and returns users from either the database, or, if there are none, from the slack API. It also handles POST request from the slack events APIs and handles them to add/change users in the database.

## Getting Started

To run the development server, install dependencies, set up the correct enviorment variables and

```bash
npm run dev
# or
yarn dev
```

## Enviorment Variables

You'll need three enviorment varibles for this project to work:

- _MONGODBCONNECTIONSTRING_: a connection string with a username and password for connecting to MongoDB Atlas
- _SLACKTOKEN_: An OAuth Token used for connecting to the Slack Web api
- _SLACKEVENTTOKEN_: A token recieved from the Slack events API

## Tests

This project uses Jest in order to test both functions in the api as well as its components. To run the tests, run

```
npm test
```
