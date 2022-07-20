# Bent

> Browser entity framework

Bent use [pnpm](https://pnpm.io/) to manage dependencies and [turbo](https://turborepo.org/) to manage the monorepo.

Nothing is shipped to npm yet but to run the example site clone the repo and run the following at root:

```
pnpm i
pnpm run dev
```

Examples app should fire up by default on port 3000. Navigate to port 3000 (usually 0.0.0.0:3000 or localhost:3000 depending on your setup) in your browser and navigate the examples app. The app will store things in IndexedDB as an example of using Bent with IndexedDB.
