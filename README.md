## Task Timer App!
This app allows you to create tasks with a timer to help organize your day-to-day life!\


## Features
* Tasks with individual timers for each
* Account login and signup
* Grade calculator
* Caffeine intake calculator
* Assignment and Essay time estimator

## Known issues
* Tasks currently do not save on the caffeine calculator page
* Caffeine calculations are quite large
* Time estimator isn't too accurate on lower confidence levels

## Future work
* Implementation of dark mode for all pages
* Better time estimations when a task is created
* Calendar

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
This will then open up a port on your computer, there should be a link in the terminal. Go there and you can see what you're doing.

**NOTE** - Svelte supports hot-reload. This means that you can leave the server running while you change stuff and it should generally update. If it doesn't, restart the server.

## Deployment
Firstly we deploy a version in a file. It can be run using the following command:
```sh
npm run dev

# Keep in mind that if NPM is not installed you will need to run the following first
npm install
```

The app is also deployed to Vercel by means of a fork. The link is below:

[Task Timer](https://task-timer-uov4.vercel.app/#)

## Contributors
* Elijah Flader: Backend work and development
* Isaac Lanning: Task timer development
* Jayden Knight: Caffeine calculator and Navbar design
* Evan Walters: Time estimators and grade calculator