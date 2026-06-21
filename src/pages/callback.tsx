import { Spinner } from "@chakra-ui/react";
import { PageProps } from "main";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { magic } from "utils/env";

const CallbackPage = (props: PageProps) => {
  const router = useRouter();

  useEffect(() => {
    (async function onLoad() {
      const result = await magic.oauth.getRedirectResult();
      const didToken = result.magic.idToken;
      console.log("🚀 ~ CallbackPage ~ didToken:", didToken);
      await fetch("/api/login", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken
        }
      });
      router.push("/", "/", { shallow: true });
      //window.location.href = "/";
    })();
  }, []);

  return <Spinner />;
};

export default CallbackPage;
