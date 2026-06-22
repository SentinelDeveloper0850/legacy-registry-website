import { prisma } from "@/lib/prisma"

const demoUserEmail = "demo@legacyregistry.local"

export async function getDemoRegisterRows() {
  const user = await prisma.user.findUnique({
    where: { email: demoUserEmail },
    select: { undertakerId: true },
  })

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
