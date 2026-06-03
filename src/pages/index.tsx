import { wrapper } from "store";

const IndexPage = () => {
  return "chaka";
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    return { props: {} };
  },
);

export default IndexPage;
