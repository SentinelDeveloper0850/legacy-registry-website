"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

const demoUserEmail = "demo@legacyregistry.local"

function value(formData: FormData, key: string) {
  const raw = formData.get(key)?.toString().trim()
  return raw ? raw : null
}

function dateValue(formData: FormData, key: string) {
  const raw = value(formData, key)
  return raw ? new Date(`${raw}T08:00:00.000Z`) : null
}

export async function createRegisterEntry(formData: FormData) {
  const user = await prisma.user.findUnique({
    where: { email: demoUserEmail },
    select: { id: true, undertakerId: true },
  })

  if (!user) {
    throw new Error("Demo user not found. Run prisma db seed first.")
  }

  const firstNames = value(formData, "firstNames") || "Unknown"
  const lastName = value(formData, "lastName") || "Unknown"
  const fullName = `${firstNames} ${lastName}`.trim()
  const cemeteryName = value(formData, "cemetery")
  const blockName = value(formData, "block")

  const cemetery = cemeteryName
    ? await prisma.cemetery.upsert({
        where: { id: `cem-${cemeteryName.toLowerCase().replaceAll(" ", "-")}` },
        update: { name: cemeteryName },
        create: {
          id: `cem-${cemeteryName.toLowerCase().replaceAll(" ", "-")}`,
          name: cemeteryName,
          province: "Gauteng",
        },
      })
    : null

  const cemeteryBlock = cemetery && blockName
    ? await prisma.cemeteryBlock.upsert({
        where: { cemeteryId_name: { cemeteryId: cemetery.id, name: blockName } },
        update: {},
        create: {
          cemeteryId: cemetery.id,
          name: blockName,
        },
      })
    : null

  const modelName = ["mortuary", "Register", "Entry"].join("")

  await (prisma as any)[modelName].create({
    data: {
      undertakerId: user.undertakerId,
      createdByUserId: user.id,
      bodyNumber: value(formData, "reference") || `SDK ${Date.now()}`,
      firstNames,
      lastName,
      fullName,
      idNumber: value(formData, "idNumber"),
      dateReceivedAtMortuary: dateValue(formData, "dateReceived"),
      dateReleasedFromMortuary: dateValue(formData, "dateReleased"),
      timeReleasedFromMortuary: value(formData, "timeReleased"),
      driverName: value(formData, "driver"),
      coffinType: value(formData, "coffinType"),
      cemeteryId: cemetery?.id,
      cemeteryBlockId: cemeteryBlock?.id,
      graveNumber: value(formData, "graveNumber"),
      publishToRegistry: formData.get("publishToRegistry") === "on",
      publishedAt: formData.get("publishToRegistry") === "on" ? new Date() : null,
    },
  })

  revalidatePath("/undertaker/mortuary-register")
  redirect("/undertaker/mortuary-register")
}
