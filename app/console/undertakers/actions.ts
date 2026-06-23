"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

function field(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim()
  return value || null
}

export async function createUndertaker(formData: FormData) {
  const name = field(formData, "name")

  if (!name) {
    throw new Error("Undertaker name is required")
  }

  await prisma.undertaker.create({
    data: {
      name,
      tradingName: field(formData, "tradingName"),
      branchName: field(formData, "branchName"),
      contactEmail: field(formData, "contactEmail"),
      contactPhone: field(formData, "contactPhone"),
    },
  })

  revalidatePath("/console")
  revalidatePath("/console/undertakers")
  redirect("/console/undertakers")
}
