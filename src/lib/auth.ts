import { env } from "@/env";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { sendEmail } from "@/services/email";
import { verificationLinkEmailTemplate } from "@/templates/email-templates";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  trustedOrigins: [env.NEXT_PUBLIC_BETTER_AUTH_URL!],
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }, _request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        html: verificationLinkEmailTemplate(url),
      });
    },
  },
  plugins: [admin()],
  // socialProviders: {
  //   facebook: {
  //     clientId: env.FACEBOOK_APP_ID,
  //     clientSecret: env.FACEBOOK_APP_SECRET,
  //   }
  // }
});
