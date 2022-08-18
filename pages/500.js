export default function FiveHundred() {
  return <div>Page failed to render!</div>;
}

export async function getStaticProps() {
  return {
    props: {
      nestedData: {
        field: "testing",
      },
    },
  };
}
