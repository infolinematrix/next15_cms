import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
// Import social providers for authentication
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { db } from "@/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/db/schema/users";
import { getUserRoleQuery } from "@/db/queries/user";

// Custom Providers (uncomment and import if used)
// import LoginProvider from '@/lib/providers/loginProvider';
// import SignupProvider from '@/lib/providers/signupProvider';
// import VerifyEmailProvider from '@/lib/providers/verifyEmailProvider';
// import MfaLoginProvider from '@/lib/providers/mfaLoginProvider';

// Initialize an empty array to hold the authentication providers
let providers = [];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Check if Google credentials are provided and add GoogleProvider to the providers array
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },

      // async profile(profile) {
      //   return {
      //     id: profile.sub,
      //     name: profile.name,
      //     firstname: profile.given_name,
      //     lastname: profile.family_name,
      //     email: profile.email,
      //     image: profile.picture,
      //   };
      // },
    })
  );
}

// Check if Twitter credentials are provided and add TwitterProvider to the providers array
if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    })
  );
}

// Example: Custom Credentials Provider (uncomment and add to the providers array if used)
// providers.push([
//   CredentialsProvider({
//     name: 'Credentials',
//     credentials: {
//       username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
//       password: { label: 'Password', type: 'password' },
//     },

//     async authorize(credentials) {
//       // Custom authentication logic here
//       return null;
//     },
//   }),
//   LoginProvider,
//   SignupProvider,
//   VerifyEmailProvider,
//   MfaLoginProvider
// ]);

// Configuration options for NextAuth
export const authOptions: NextAuthOptions = {
  callbacks: {
    // Handle JWT updates and custom logic here
    async jwt({ token, user, account, trigger, session }) {
      // if (!token.sub) throw Error("Token Id Missing.....");

      const role = await getUserRoleQuery(token.sub!);
      token.role = role;

      // Example: Handle session updates with NextAuth update function
      if (trigger === "update") {
        // Custom logic for session updates
      }

      // Example: Handle different authentication providers (Google, Twitter, Custom Credentials)
      if (account?.provider === "google") {
        // Custom logic for Google provider
      }
      if (account?.provider === "twitter") {
        // Custom logic for Twitter provider
      }
      if (account?.provider === "credentials") {
        // Custom logic for Custom Credentials provider
      }

      return token;
    },

    async session({ session, token, user }) {
      // Custom session data handling logic here
      // console.log("token", token.accessTokens);

      if (token?.accessToken) session.accessToken = token.accessToken;
      session.token = token;

      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Set the NextAuth secret from environment variables
  providers, // Use the configured authentication providers

  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
};

// Initialize NextAuth with the provided options
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests (can be customized)
export { handler as GET, handler as POST };

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    token?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    token?: any;
  }
}
