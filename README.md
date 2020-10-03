# Simple/Partial GitHub Issues Clone

This app demonstrates the features of the experimental React in the context of the real app with the help of [Experimental React Router v6](https://github.com/ReactTraining/react-router/blob/dev/docs/api-reference.md) and [React Query with Suspense enabled](https://react-query.tanstack.com/docs/guides/suspense).

#### Key features:

* Implementing the [render-as-you-fetch](https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense) pattern. During route transitions the app is configured to load the code and data for new routes *in parallel*. It uses the new prop of the Route, React router component, called "preload" which will be invoked before the Component renders. 
* Using Concurrent Mode and Suspense to improve the loading sequence, including [`useTransition()`](https://reactjs.org/docs/concurrent-mode-reference.html#usetransition) for route transitions in order to continue showing the previous route for a brief period while the next route is prepared/rendered.
* Uses the Suspense-enabled React query to colocate data-deps.
* Uses some features from React Router v6 like preloading, nested routes, relative links, hook for Search params, etc.

## Setup

This app is meant for experimentation; we recommend cloning and running locally, hacking on the source code, trying to change things and see how it affects the user experience.

1. First, clone the app:

        git clone git@github.com:denniscual/simple-mock-github.git

2. Change into the app's directory:

        cd simple-mock-github

3. Install the app's dependencies:

        # npm users:
        npm install

        # yarn users:
        yarn

4. Get your GitHub authentication token in order to let the app query GitHub's public GraphQL API:
   1. Open https://github.com/settings/tokens.
   2. Ensure that at least the `repo` scope is selected.
   3. Generate the token
   4. Create a file `./simple-mock-github/.env.local` and add the following contents (substitute `<TOKEN>` for your authentication token):

          # simple-mock-github/.env.local
          REACT_APP_GITHUB_AUTH_TOKEN=<TOKEN>

Now you're ready to run the app!

## Running The App

You can run the app by navigating to `simple-mock-github/issue-tracker/` and then running the start command:

        # npm users:
        npm start

        # yarn users:
        yarn start

This will start the development server and open a browser to [http://localhost:3000/facebook/react/code](http://localhost:3000/facebook/react/code).

## About the App

This app uses a number of technologies including (among others):

- [Create React App](https://github.com/facebook/create-react-app): 
  - The app uses [typescript template](https://create-react-app.dev/docs/adding-typescript/).
  - The app uses CRA's support for environment variables - https://create-react-app.dev/docs/adding-custom-environment-variables - to allow configuring the GitHub authentication token.
  - The app enables [prettier](https://prettier.io) for code formatting, as discussed in https://create-react-app.dev/docs/setting-up-your-editor#formatting-code-automatically.
  - Note that Create React App itself builds upon many great technologies, see the docs for more details!
- React's [experimental release with Concurrent Mode and Suspense](https://reactjs.org/docs/concurrent-mode-intro.html). 
- [Experimental React Router v6](https://github.com/ReactTraining/react-router/blob/dev/docs/api-reference.md) . This version already support the `preloading` of data and codes. 
- [React Query Suspense-enabled](https://react-query.tanstack.com/docs/guides/suspense).
- [Experimental Stitches](https://stitches.dev/) - The modern styling library.

