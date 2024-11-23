"use server";

import { CookieKeys } from "@/constants/cookie-keys";
import { cookies } from "next/headers";

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set(CookieKeys.AI_MODEL_ID, model);
}
