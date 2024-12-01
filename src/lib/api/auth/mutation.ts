import { db, eq } from "@/server/db";
import { authorizedEmail as authorizedEmailTable } from "@/server/db/schema";

export const isEmailAuthorized = async ({ email }: { email: string }) => {
  const [authorizedEmail] = await db
    .select()
    .from(authorizedEmailTable)
    .where(eq(authorizedEmailTable.email, email))
    .limit(1)
    .execute();

  return !!authorizedEmail;
};