"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { UserRole } from "@/lib/generated/prisma"
import { prisma } from "@/lib/prisma"

function field(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim()
  return value || null
}

export async function saveConsoleUser(formData: FormData) {
  const undertakerId = field(formData, "undertakerId")
  const name = field(formData, "name")
  const email = field(formData, "email")
  const roleValue = field(formData, "role")

  if (!undertakerId || !name || !email) {
    throw new Error("Missing required fields")
  }

  await prisma.user.create({
    data: {
      undertakerId,
      name,
      email,
      role: roleValue === "UNDERTAKER_ADMIN" ? UserRole.UNDERTAKER_ADMIN : UserRole.UNDERTAKER_USER,
      isActive: true,
    },
  })

  revalidatePath("/console")
  revalidatePath("/console/users")
  revalidatePath("/console/undertakers")
  redirect("/console/users")
}
