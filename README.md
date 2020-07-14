# hourglass-fe

## Getting Started
1. Clone the repo
1. Run `npm i` to install dependencies
1. Add the Mapbox token to **.env.local** in the project root in the form `REACT_APP_TOKEN=token_from_slack`. Note: this file should remain untracked.
1. Run `npm start` to build the web app on your local machine


## Scripts
### Start a local server with linting: **`npm start`**
* Note is that linting issues will not throw errors once the server has started, so **before making a pull request you need to re-run `npm start` or `npm run build`**.
* Note, if there are linting issues the server will not start. You can run `npm run start-no-lint` if you want to temporarily ignore linting issues but be sure to at least run `npm run build` before making a pull request.
### Build the project: **`npm run build`**
### Run tests: **`npm run test`**
### Run just the linter: **`npm run lint`**
### Run linter and auto-fix most issues: **`npm run lint-fix`**
