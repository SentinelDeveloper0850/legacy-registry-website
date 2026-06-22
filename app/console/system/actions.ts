"use server"

import { revalidatePath } from "next/cache"

import { clearDemoData, seedDemoData } from "@/lib/demo-data"

export async function seedDemo() {
  await seedDemoData()
  revalidatePath("/console")
  revalidatePath("/console/system")
  revalidatePath("/undertaker/mortuary-register")
}

export async function clearDemo() {
  await clearDemoData()
  revalidatePath("/console")
  revalidatePath("/console/system")
  revalidatePath("/undertaker/mortuary-register")
}
