"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { getWorkspaceUser } from "@/lib/workspace-context"

function text(formData: FormData, key: string) {
  const raw = formData.get(key)?.toString().trim()
  return raw || null
}

function date(formData: FormData, key: string) {
  const raw = text(formData, key)
  return raw ? new Date(`${raw}T08:00:00.000Z`) : null
}

function decimal(formData: FormData, key: string) {
  const raw = text(formData, key)
  return raw ? raw : null
}

function dateTime(formData: FormData, key: string) {
  const raw = text(formData, key)
  return raw ? new Date(raw) : null
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-")
}

export async function saveWorkspaceEntry(formData: FormData) {
  const user = await getWorkspaceUser()

  if (!user) {
    throw new Error("Select a workspace user first")
  }

  const firstNames = text(formData, "firstNames") || "Unknown"
  const lastName = text(formData, "lastName") || "Unknown"
  const fullName = `${firstNames} ${lastName}`.trim()
  const cemeteryName = text(formData, "cemetery")
  const blockName = text(formData, "block")

  const cemetery = cemeteryName
    ? await prisma.cemetery.upsert({
        where: { id: `cem-${slug(cemeteryName)}` },
        update: { name: cemeteryName },
        create: {
          id: `cem-${slug(cemeteryName)}`,
          name: cemeteryName,
          province: "Gauteng",
        },
      })
    : null

  const block = cemetery && blockName
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
  const publish = formData.get("publishToRegistry") === "on"

  await (prisma as any)[modelName].create({
    data: {
      undertakerId: user.undertakerId,
      createdByUserId: user.id,
      bodyNumber: text(formData, "reference") || `SDK ${Date.now()}`,
      firstNames,
      lastName,
      fullName,
      idNumber: text(formData, "idNumber"),
      dateReceivedAtMortuary: date(formData, "dateReceived"),
      dateReleasedFromMortuary: date(formData, "dateReleased"),
      timeReleasedFromMortuary: text(formData, "timeReleased"),
      driverName: text(formData, "driver"),
      coffinType: text(formData, "coffinType"),
      cemeteryId: cemetery?.id,
      cemeteryBlockId: block?.id,
      graveNumber: text(formData, "graveNumber"),
      graveLatitude: decimal(formData, "graveLatitude"),
      graveLongitude: decimal(formData, "graveLongitude"),
      gpsAccuracy: decimal(formData, "gpsAccuracy"),
      gpsCapturedAt: dateTime(formData, "gpsCapturedAt"),
      publishToRegistry: publish,
      publishedAt: publish ? new Date() : null,
    },
  })

  revalidatePath("/undertaker/mortuary-register")
  redirect("/undertaker/mortuary-register")
}
