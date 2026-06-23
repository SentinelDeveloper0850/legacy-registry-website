import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Camera, MapPin, Navigation, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  formatAccuracy,
  formatLocation,
  formatPublicDate,
  getPublicRegistryRecord,
  mapsLink,
} from "@/lib/public-registry"

type PageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function PublicRecordPage({ params }: PageProps) {
  const { id } = await params
  const record = await getPublicRegistryRecord(id)

  if (!record) {
    notFound()
  }

  const navigateHref = mapsLink(record)

  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="border-b bg-muted/30 px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <Button variant="ghost" className="mb-8 w-fit px-0 hover:bg-transparent" asChild>
            <Link href="/search">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to search
            </Link>
          </Button>

          <div className="rounded-[2rem] border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Public registry record</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight">{record.fullName}</h1>
                <p className="mt-3 text-sm text-muted-foreground">Reference: {record.bodyNumber}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Published record
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                icon={<CalendarDays className="size-5" aria-hidden="true" />}
                title="Recorded dates"
                rows={[
                  ["Received", formatPublicDate(record.dateReceivedAtMortuary)],
                  ["Released", formatPublicDate(record.dateReleasedFromMortuary)],
                  ["Published", formatPublicDate(record.publishedAt)],
                ]}
              />
              <InfoCard
                icon={<MapPin className="size-5" aria-hidden="true" />}
                title="Resting place"
                rows={[
                  ["Cemetery", record.cemetery?.name ?? "Not captured"],
                  ["Location", formatLocation(record)],
                  ["GPS accuracy", formatAccuracy(record)],
                  ["Municipality", record.cemetery?.municipality ?? "Not captured"],
                  ["Province", record.cemetery?.province ?? "Not captured"],
                ]}
              />
            </div>

            {record.gravePhotoDataUrl ? (
              <section className="mt-6 overflow-hidden rounded-2xl border bg-background">
                <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3 font-semibold tracking-tight">
                  <Camera className="size-5" aria-hidden="true" />
                  <h2>Grave photo</h2>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={record.gravePhotoDataUrl} alt={`Grave photo for ${record.fullName}`} className="max-h-[32rem] w-full object-cover" />
                <p className="px-4 py-3 text-sm text-muted-foreground">
                  Use this photo to visually confirm the exact grave once navigation brings you nearby.
                </p>
              </section>
            ) : null}

            <div className="mt-6 rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <p>
                  Source: {record.undertaker?.tradingName ?? record.undertaker?.name ?? "Undertaker record"}. Internal mortuary workflow fields are not displayed publicly.
                </p>
                {navigateHref ? (
                  <Button asChild>
                    <a href={navigateHref} target="_blank" rel="noreferrer">
                      <Navigation className="size-4" aria-hidden="true" />
                      Navigate to grave
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoCard({ icon, title, rows }: { icon: ReactNode; title: string; rows: [string, string][] }) {
  return (
    <section className="rounded-2xl border bg-background p-5">
      <div className="mb-4 flex items-center gap-2 font-semibold tracking-tight">
        {icon}
        <h2>{title}</h2>
      </div>
      <dl className="grid gap-3 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
