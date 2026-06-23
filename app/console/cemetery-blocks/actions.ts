"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

function field(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim()
  return value || null
}

export async function createCemeteryBlock(formData: FormData) {
  const cemeteryId = field(formData, "cemeteryId")
  const name = field(formData, "name")
  const capacity = field(formData, "capacity")

  if (!cemeteryId || !name) {
    throw new Error("Cemetery and block name are required")
  }

  await prisma.cemeteryBlock.create({
    data: {
      cemeteryId,
      name,
      capacity: capacity ? Number(capacity) : null,
      description: field(formData, "description"),
    },
  })

  revalidatePath("/console")
  revalidatePath("/console/cemetery-blocks")
  revalidatePath("/console/cemeteries")
  redirect("/console/cemetery-blocks")
}
