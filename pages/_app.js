function MyApp({ Component, pageProps }) {
  const {
    nestedData: { field },
  } = pageProps;
  return <Component {...pageProps} />;
}

export default MyApp;
