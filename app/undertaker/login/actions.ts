"use server"

import { redirect } from "next/navigation"

import { setWorkspaceUser } from "@/lib/workspace-context"

export async function chooseWorkspaceUser(formData: FormData) {
  const userId = formData.get("userId")?.toString()
  const redirectTo = formData.get("redirectTo")?.toString() || "/undertaker"

  if (!userId) {
    throw new Error("Select a user")
  }

  await setWorkspaceUser(userId)
  redirect(redirectTo)
}
