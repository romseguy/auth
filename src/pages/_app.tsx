import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react";
import { theme } from "features/layout/theme";
import { wrapper } from "store";
import { setIsMobile } from "store/uiSlice";

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

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx }) => {
  const headers = ctx.req?.headers;
  const cookies = headers?.cookie;
  store.dispatch(setIsMobile(true));
  return { cookies, pageProps: {} };
});

export default App;
