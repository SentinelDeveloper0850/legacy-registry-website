import { cookies } from "next/headers"

import { prisma } from "@/lib/prisma"

const key = "legacy_registry_workspace_user"

export async function setWorkspaceUser(userId: string) {
  const store = await cookies()

  store.set(key, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })
}

export async function getWorkspaceUser() {
  const store = await cookies()
  const userId = store.get(key)?.value

  if (!userId) {
    return null
  }

  return prisma.user.findUnique({
    where: { id: userId },
    include: { undertaker: true },
  })
}
