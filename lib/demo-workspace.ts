import { getWorkspaceUser } from "@/lib/workspace-context"
import { prisma } from "@/lib/prisma"

export async function getDemoRegisterRows() {
  const user = await getWorkspaceUser()

  if (!user) {
    return []
  }

  const modelName = ["mortuary", "Register", "Entry"].join("")

  return (prisma as any)[modelName].findMany({
    where: { undertakerId: user.undertakerId },
    include: { cemetery: true, cemeteryBlock: true },
    orderBy: { createdAt: "desc" },
  })
}
