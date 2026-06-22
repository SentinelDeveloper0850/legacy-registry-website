"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

function field(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim()
  return value || null
}

export async function createCemetery(formData: FormData) {
  const name = field(formData, "name")

  if (!name) {
    throw new Error("Cemetery name is required")
  }

  await prisma.cemetery.create({
    data: {
      name,
      municipality: field(formData, "municipality"),
      province: field(formData, "province"),
      address: field(formData, "address"),
    },
  })

  revalidatePath("/console")
  revalidatePath("/console/cemeteries")
  redirect("/console/cemeteries")
}
