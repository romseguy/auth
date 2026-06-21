import { HStack, useColorMode } from "@chakra-ui/react";
import { useSession } from "hooks/useSession";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectIsMobile } from "store/uiSlice";

import { Layout } from "features/layout";
import { PageProps } from "main";
import { magic } from "utils/env";

const IndexPage = ({ ...props }: PageProps) => {
  const { colorMode } = useColorMode();
  const isMobile = useSelector(selectIsMobile);
  const { data: session, loading: isSessionLoading } = useSession();
  console.log("🚀 ~ IndexPage ~ session:", session);

  const h = async () => {
    await magic.oauth.loginWithRedirect({
      provider: "github",
      redirectURI: new URL("/callback", window.location.origin).href
    });
  };

  return (
    <Layout {...props}>
      <HStack>
        <>
          <p>{colorMode}</p>
          <p>{isMobile ? "isMobile" : "Dekstop"}</p>
          <p>{session ? session.user.email : "logged out"}</p>
          <p>{isSessionLoading ? "loading" : "loaded"}</p>
          <p>
            <button onClick={h}>login</button>
          </p>
        </>
      </HStack>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    return { props: {} };
  }
);

export default IndexPage;
