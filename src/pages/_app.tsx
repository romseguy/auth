import { ChakraProvider } from "@chakra-ui/react";
import { wrapper } from "store";

const MyApp = wrapper.withRedux(({ Component, pageProps, ...props }) => {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
});

export default MyApp;
