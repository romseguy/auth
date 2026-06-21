import { HStack, useColorMode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectIsMobile } from "store/uiSlice";

const IndexPage = () => {
  const { colorMode } = useColorMode();
  const isMobile = useSelector(selectIsMobile);
  return (
    <HStack>
      <>
        <p>1</p>
        <p>2</p>
        <p>{colorMode}</p>
        <p>{isMobile ? "isMobile" : "Dekstop"}</p>
      </>
    </HStack>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    return { props: {} };
  }
);

export default IndexPage;
