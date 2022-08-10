export default function Error() {
  return <div>Error encountered!</div>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      nestedData: {
        field: "some-data",
      },
    },
  };
}
