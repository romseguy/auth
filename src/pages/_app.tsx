import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react";
import { unseal } from "@hapi/iron";
import { parse } from "cookie";
import { theme } from "features/layout/theme";
import { PageProps } from "main";
import { wrapper } from "store";
import { setSession } from "store/sessionSlice";
import { setIsMobile } from "store/uiSlice";
import { getAuthToken, sealOptions, Session, TOKEN_NAME } from "utils/auth";

const App = wrapper.withRedux(({ Component, cookies, pageProps, ...props }) => {
  return (
    <ChakraProvider
      colorModeManager={cookieStorageManager(cookies)}
      theme={theme}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
});

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }) => {
      const headers = ctx.req?.headers;
      console.log("🚀 ~ headers:", headers);
      const isMobile = true;
      store.dispatch(setIsMobile(isMobile));

      const cookies = headers?.cookie;
      let authToken: string | null | undefined = null;
      let session: Session | undefined;
      if (typeof cookies === "string" && cookies.includes(TOKEN_NAME)) {
        const cookie = parse(cookies);
        // console.log("🚀 ~ App.getInitialProps ~ cookie map:", cookie);
        authToken = getAuthToken(cookie);

        if (authToken) {
          // console.log("🚀 ~ App.getInitialProps ~ authToken:", authToken);
          const user = await unseal(authToken, process.env.SECRET, sealOptions);

          if (user) {
            // const isAdmin =
            //   typeof process.env.ADMIN_EMAILS === "string"
            //     ? process.env.ADMIN_EMAILS.split(",").includes(user.email)
            //     : false;

            session = {
              user: {
                ...user
                //isAdmin
              }
            };
          }
        }
      }
      if (session) {
        store.dispatch(setSession({ ...session, [TOKEN_NAME]: authToken }));
      }

      let pageProps: PageProps = { isMobile };

      if (Component.getInitialProps)
        pageProps = {
          ...pageProps,
          ...(await Component.getInitialProps(ctx))
        };

      return { cookies, pageProps };
    }
);

export default App;
