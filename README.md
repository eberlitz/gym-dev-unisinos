[![Build Status](https://travis-ci.org/eberlitz/gym-dev-unisinos.svg?branch=master)](https://travis-ci.org/eberlitz/gym-dev-unisinos)

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

# Contributing

You can't push directly to master. So you must: 

1. Ensure you are in master and it is up to date.
1. Create a branch `git checkout -b <initials-branch-name>`. Consider using your initials as a prefix in the branch name. Example, my name is Eduardo Berlitz, so I usually use 'eb-description', note the 'eb-' prefix.
2. Commit & Push your changes
3. Go to the github site and create a Pull Request
4. Go back to master: `git checkout master`. Now you can start working in another task locally.
5. In the github page, wait for the reviewers approval and merge of your pull request to master.

Notes:

If you forgot to create a branch and made a commit in master, just do the previous steps and in the end you will need to reset your master branch with `git reset --hard HEAD^`
