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
