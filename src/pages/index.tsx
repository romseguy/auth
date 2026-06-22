import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, useColorMode } from "@chakra-ui/react";
import { useSession } from "hooks/useSession";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectIsMobile } from "store/uiSlice";

import { Layout } from "features/layout";
import { PageProps } from "main";
import { magic } from "utils/auth";

const IndexPage = ({ ...props }: PageProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const isMobile = useSelector(selectIsMobile);
  const { data: session, loading: isSessionLoading } = useSession();
  console.log("🚀 ~ IndexPage ~ session:", session, isSessionLoading);

  const h = async () => {
    await magic.oauth.loginWithRedirect({
      provider: "github",
      redirectURI: new URL("/callback", window.location.origin).href,
    });
  };

  const l = async () => {
    await fetch("/api/login", { method: "DELETE" });
    window.location.href = "/";
  };

  return (
    <Layout {...props}>
      <HStack>
        <>
          <button onClick={toggleColorMode}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <p>{isMobile ? "Mobile" : "Desktop"}</p>
          <p>{session ? session.user.email : "Anonymous"}</p>
          {!session && (
            <p>
              <button onClick={h}>login</button>
            </p>
          )}
          {session && (
            <p>
              <button onClick={l}>logout</button>
            </p>
          )}
        </>
      </HStack>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    return { props: {} };
  },
);

export default IndexPage;
