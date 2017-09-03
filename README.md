# Dependencies

- Node v7+ (I`m using v8.4.0)
- MongoDB
- VSCode

# Install project packages

1. `npm i -g @angular/cli@latest typescript`
1. `npm i`

# Run in dev mode

1. `npm start`
1. `open http://localhost:4200`

Obs.: this command does the following:

- Start the typescript compiler in watch mode for the server files (`tsc -p server -w`);
- Start nodemon to watch and serve the server (`nodemon server`) on port 8000;
- Start the `ng serve` to serve the frontend files on port 4200.
