import { db, eq } from "@/server/db";
import {
  authorizedEmail as authorizedEmailTable,
  user,
} from "@/server/db/schema";

export const getAllAuthorizedEmails = async () => {
  return await db
    .select({
      email: authorizedEmailTable.email,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
    })
    .from(authorizedEmailTable)
    .leftJoin(user, eq(user.email, authorizedEmailTable.email))
    .execute();
};
