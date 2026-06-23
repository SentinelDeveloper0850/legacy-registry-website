"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { uploadGravePhoto } from "@/lib/cloudinary"
import { prisma } from "@/lib/prisma"
import { getWorkspaceUser } from "@/lib/workspace-context"

function text(formData: FormData, key: string) {
  const raw = formData.get(key)?.toString().trim()
  return raw || null
}

function decimal(formData: FormData, key: string) {
  const raw = text(formData, key)
  return raw || null
}

function dateTime(formData: FormData, key: string) {
  const raw = text(formData, key)
  return raw ? new Date(raw) : null
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-")
}

async function tryUploadPhoto(dataUrl: string | null) {
  if (!dataUrl) {
    return null
  }

  try {
    return await uploadGravePhoto(dataUrl)
  } catch (error) {
    console.error("Grave photo upload failed", error)
    return null
  }
}

export async function updateWorkspaceEntry(entryId: string, formData: FormData) {
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

  const uploadedPhoto = await tryUploadPhoto(text(formData, "gravePhotoDataUrl"))
  const publish = formData.get("publishToRegistry") === "on"

  await (prisma as any)[modelName].update({
    where: { id: entryId },
    data: {
      cemeteryId: cemetery?.id ?? null,
      cemeteryBlockId: block?.id ?? null,
      graveNumber: text(formData, "graveNumber"),
      graveLatitude: decimal(formData, "graveLatitude") ?? existing.graveLatitude,
      graveLongitude: decimal(formData, "graveLongitude") ?? existing.graveLongitude,
      gpsAccuracy: decimal(formData, "gpsAccuracy") ?? existing.gpsAccuracy,
      gpsCapturedAt: dateTime(formData, "gpsCapturedAt") ?? existing.gpsCapturedAt,
      gravePhotoUrl: uploadedPhoto?.url ?? existing.gravePhotoUrl,
      gravePhotoPublicId: uploadedPhoto?.publicId ?? existing.gravePhotoPublicId,
      gravePhotoCapturedAt: uploadedPhoto ? dateTime(formData, "gravePhotoCapturedAt") : existing.gravePhotoCapturedAt,
      publishToRegistry: publish,
      publishedAt: publish ? existing.publishedAt ?? new Date() : null,
      updatedByUserId: user.id,
    },
  })

  revalidatePath("/undertaker/mortuary-register")
  revalidatePath(`/undertaker/mortuary-register/${entryId}`)
  redirect("/undertaker/mortuary-register")
}
