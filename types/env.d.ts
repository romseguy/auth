import { Password } from "@hapi/iron";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "development" | "production" | "test";
      SECRET: Password | Password.Hash;
    }
  }
}
