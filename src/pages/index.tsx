import { ChatIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Heading, HStack, useColorMode, VStack } from "@chakra-ui/react";
import { useSession } from "hooks/useSession";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectIsMobile } from "store/uiSlice";

import { Layout } from "features/layout";
import { PageProps } from "main";
import { magic } from "utils/auth";
import { useState } from "react";

const IndexPage = ({ ...props }: PageProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const isMobile = useSelector(selectIsMobile);
  const { data: session, loading: isSessionLoading } = useSession();
  console.log("🚀 ~ IndexPage ~ session:", session, isSessionLoading);
  const [topics, setTopics] = useState([]);

  const a = async () => {
    const res = await fetch("/api/all");
    console.log("🚀 ~ a ~ res:", res);
    const res2 = await fetch("/topics.json");
    let data = await res2.json();
    data = data.filter((topic) => typeof topic.event === "undefined");
    setTopics(data);
  };

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
          <button onClick={a}>/all</button>
        </>
      </HStack>

      <VStack align="start">
        {topics.map((topic) => (
          <Heading>
            <ChatIcon />{" "}
            <a
              href={`https://data.romseguy.com/${topic.org}/d/${topic._id}`}
              target="_blank"
            >
              {topic.topicName}
            </a>
          </Heading>
        ))}
      </VStack>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    return { props: {} };
  },
);

export default IndexPage;
