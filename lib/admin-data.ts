import { prisma } from "@/lib/prisma"

export async function getAdminDashboardStats() {
  const registryModel = ["mortuary", "Register", "Entry"].join("")

  const [undertakers, users, cemeteries, blocks, entries, published] = await Promise.all([
    prisma.undertaker.count(),
    prisma.user.count(),
    prisma.cemetery.count(),
    prisma.cemeteryBlock.count(),
    (prisma as any)[registryModel].count(),
    (prisma as any)[registryModel].count({ where: { publishToRegistry: true } }),
  ])

  return [
    { label: "Undertakers", value: undertakers },
    { label: "Users", value: users },
    { label: "Cemeteries", value: cemeteries },
    { label: "Blocks", value: blocks },
    { label: "Register entries", value: entries },
    { label: "Published records", value: published },
  ]
}

export async function getUndertakerRows() {
  return prisma.undertaker.findMany({
    include: {
      _count: {
        select: {
          users: true,
          mortuaryRegisterEntries: true,
        },
      },
    },
    orderBy: { name: "asc" },
  })
}

export async function getUserRows() {
  return prisma.user.findMany({
    include: { undertaker: true },
    orderBy: { name: "asc" },
  })
}

export async function getCemeteryRows() {
  return prisma.cemetery.findMany({
    include: {
      _count: {
        select: {
          blocks: true,
          graveRecords: true,
          mortuaryRegisterEntries: true,
        },
      },
    },
    orderBy: { name: "asc" },
  })
}

export async function getCemeteryBlockRows() {
  return prisma.cemeteryBlock.findMany({
    include: {
      cemetery: true,
      _count: {
        select: {
          graveRecords: true,
          mortuaryRegisterEntries: true,
        },
      },
    },
    orderBy: [{ cemetery: { name: "asc" } }, { name: "asc" }],
  })
}
