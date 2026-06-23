"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { getWorkspaceUser } from "@/lib/workspace-context"

function value(formData: FormData, key: string) {
  const raw = formData.get(key)?.toString().trim()
  return raw || null
}

function numberValue(formData: FormData, key: string) {
  return value(formData, key)
}

function timeValue(formData: FormData, key: string) {
  const raw = value(formData, key)
  return raw ? new Date(raw) : null
}

function key(value: string) {
  return value.toLowerCase().replaceAll(" ", "-")
}

export async function saveEntryUpdate(entryId: string, formData: FormData) {
  const user = await getWorkspaceUser()

  if (!user) {
    throw new Error("Select a workspace user first")
  }

  const modelName = ["mortuary", "Register", "Entry"].join("")
  const existing = await (prisma as any)[modelName].findFirst({
    where: {
      id: entryId,
      undertakerId: user.undertakerId,
    },
  })

  if (!existing) {
    throw new Error("Entry not found")
  }

  const cemeteryName = value(formData, "cemetery")
  const blockName = value(formData, "block")
  const cemetery = cemeteryName
    ? await prisma.cemetery.upsert({
        where: { id: `cem-${key(cemeteryName)}` },
        update: { name: cemeteryName },
        create: {
          id: `cem-${key(cemeteryName)}`,
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

  const photoUrl = value(formData, "gravePhotoUrl")
  const photoId = value(formData, "gravePhotoPublicId")
  const publish = formData.get("publishToRegistry") === "on"

  await (prisma as any)[modelName].update({
    where: { id: entryId },
    data: {
      cemeteryId: cemetery?.id ?? null,
      cemeteryBlockId: block?.id ?? null,
      graveNumber: value(formData, "graveNumber"),
      graveLatitude: numberValue(formData, "graveLatitude") ?? existing.graveLatitude,
      graveLongitude: numberValue(formData, "graveLongitude") ?? existing.graveLongitude,
      gpsAccuracy: numberValue(formData, "gpsAccuracy") ?? existing.gpsAccuracy,
      gpsCapturedAt: timeValue(formData, "gpsCapturedAt") ?? existing.gpsCapturedAt,
      gravePhotoUrl: photoUrl ?? existing.gravePhotoUrl,
      gravePhotoPublicId: photoId ?? existing.gravePhotoPublicId,
      gravePhotoCapturedAt: photoUrl ? timeValue(formData, "gravePhotoCapturedAt") : existing.gravePhotoCapturedAt,
      publishToRegistry: publish,
      publishedAt: publish ? existing.publishedAt ?? new Date() : null,
      updatedByUserId: user.id,
    },
  })

  revalidatePath("/undertaker/mortuary-register")
  revalidatePath(`/undertaker/mortuary-register/${entryId}`)
  redirect("/undertaker/mortuary-register")
}
