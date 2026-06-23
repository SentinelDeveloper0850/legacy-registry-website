import { prisma } from "@/lib/prisma"

const modelName = ["mortuary", "Register", "Entry"].join("")

export type PublicRegistryFilters = {
  query?: string
  cemetery?: string
  burialYear?: string
}

function contains(value?: string) {
  return value?.trim() ? { contains: value.trim(), mode: "insensitive" as const } : undefined
}

function yearFilter(year?: string) {
  const value = year?.trim()

  if (!value || !/^\d{4}$/.test(value)) {
    return undefined
  }

  const start = new Date(`${value}-01-01T00:00:00.000Z`)
  const end = new Date(`${Number(value) + 1}-01-01T00:00:00.000Z`)

  return { gte: start, lt: end }
}

export async function searchPublicRegistry(filters: PublicRegistryFilters) {
  const nameFilter = contains(filters.query)
  const cemeteryFilter = contains(filters.cemetery)
  const dateReleasedFilter = yearFilter(filters.burialYear)

  return (prisma as any)[modelName].findMany({
    where: {
      publishToRegistry: true,
      ...(nameFilter ? { fullName: nameFilter } : {}),
      ...(dateReleasedFilter ? { dateReleasedFromMortuary: dateReleasedFilter } : {}),
      ...(cemeteryFilter ? { cemetery: { name: cemeteryFilter } } : {}),
    },
    include: {
      undertaker: true,
      cemetery: true,
      cemeteryBlock: true,
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  })
}

export async function getPublicRegistryRecord(id: string) {
  const record = await (prisma as any)[modelName].findFirst({
    where: {
      id,
      publishToRegistry: true,
    },
    include: {
      undertaker: true,
      cemetery: true,
      cemeteryBlock: true,
    },
  })

  if (!record) {
    return null
  }

  return {
    ...record,
    gravePhotoDataUrl: record.gravePhotoUrl,
  }
}

export function formatPublicDate(value?: Date | string | null) {
  if (!value) {
    return "Not captured"
  }

  const date = typeof value === "string" ? new Date(value) : value

  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function formatLocation(record: any) {
  return [record.cemeteryBlock?.name, record.graveNumber ? `Grave ${record.graveNumber}` : null]
    .filter(Boolean)
    .join(" · ") || "Location details pending"
}

export function hasAcceptedGps(record: any) {
  return Boolean(record.graveLatitude && record.graveLongitude && Number(record.gpsAccuracy) <= 5)
}

export function mapsLink(record: any) {
  if (!hasAcceptedGps(record)) {
    return null
  }

  return `https://www.google.com/maps?q=${record.graveLatitude},${record.graveLongitude}`
}

export function formatAccuracy(record: any) {
  return record.gpsAccuracy ? `±${Number(record.gpsAccuracy).toFixed(2)}m` : "Not captured"
}
