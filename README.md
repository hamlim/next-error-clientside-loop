# Next.js SSR error + clientside error loop

This repo replicates a minimal demo of a bug (maybe?) in the behavior of Next when hydrating the `_error` entrypoint on the client.

## Steps to replicate:

- Clone the repo
- Run `yarn` (using yarn classic - 1.x)
- Run `yarn build`
- Run `yarn start`
- Visit `localhost:3000`
- See continuous loop of client side errors

## Context:

Our actual application passes some core data (props) via a nested field within the `props` returned from `getServerSideProps` for both our "happy path" pages (e.g. `index.js` here) as well as our `_error.js` page. `_app` then pulls that nested data out of `pageProps` and uses it to render core react context providers we need for all experiences the application renders (including our error pages)!

In this demo I'm omitting the providers, since all we need to show the issue is destructuring the data from `pageProps` - which replicates where we see the error in our application as well.

## Investigation:

I briefly dug into the issue in our own application and came away with the following rough notes:

1. Client hydration seems to happen in a loop, [`componentDidCatch` on the `Container` component here](https://github.com/vercel/next.js/blob/01888dcb001f83a467088975071ce9c28eb58cad/packages/next/client/index.tsx#L97-L99), seems to call the same [`render` function to re-enter erring `_app` component](https://github.com/vercel/next.js/blob/01888dcb001f83a467088975071ce9c28eb58cad/packages/next/client/index.tsx#L636-L638).
2. The fallback logic for rendering the `_error` entrypoint seems to conditionally choose to pass the existing props from the server or props fetched from `getInitialProps`
   a. Should this take into account that `_error` may use `getServerSideProps` and not `getInitialProps`?
   b. If not, should we continue to use the initial server props if `getInitialProps` isn't defined?
