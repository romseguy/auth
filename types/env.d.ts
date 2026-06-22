import { Password } from "@hapi/iron";
import { TOKEN_NAME } from "utils/auth/cookie";

declare global {
  type UserMetadata = {
    email: string;
    userId: string;
    //userImage?: Base64Image;
    userName: string;
    isAdmin?: boolean;
  };

  type Session = {
    [TOKEN_NAME]?: string | null;
    user: UserMetadata;
  };
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "development" | "production" | "test";
      DATABASE_URL: string;
      SECRET: string | Password | Password.Hash;
      NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: string;
    }
  }
}
