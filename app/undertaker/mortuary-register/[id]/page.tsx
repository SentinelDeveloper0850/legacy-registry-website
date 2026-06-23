import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { GpsCapture } from "@/components/gps-capture"
import { GravePhotoCapture } from "@/components/grave-photo-capture"
import { getWorkspaceRegisterEntry } from "@/lib/demo-workspace"
import { saveEntryUpdate } from "./update-assets"

type PageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EditRegisterEntryPage({ params }: PageProps) {
  const { id } = await params
  const entry = await getWorkspaceRegisterEntry(id)

  if (!entry) {
    notFound()
  }

  const updateAction = saveEntryUpdate.bind(null, entry.id)

  return (
    <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/undertaker/mortuary-register">Back to register</Link>
        </Button>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Update entry</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{entry.fullName}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Update the public location details, GPS reading, grave photo, and registry readiness.
          </p>
        </div>

        <form action={updateAction} className="grid gap-6 rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <div className="grid gap-4 rounded-2xl border bg-muted/30 p-4 sm:grid-cols-2">
            <Detail label="Reference" value={entry.bodyNumber} />
            <Detail label="Identifier" value={entry.idNumber || entry.alternateIdNumber || "Not set"} />
          </div>

          <div className="rounded-2xl border bg-muted/30 p-4">
            <h2 className="font-semibold tracking-tight">Public location details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field label="Cemetery" name="cemetery" defaultValue={entry.cemetery?.name ?? ""} placeholder="Mooifontein" />
              <Field label="Block" name="block" defaultValue={entry.cemeteryBlock?.name ?? ""} placeholder="Block 42B" />
              <Field label="Grave number" name="graveNumber" defaultValue={entry.graveNumber ?? ""} placeholder="111" />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="grid gap-3">
              <GpsCapture />
              {entry.gpsAccuracy ? (
                <p className="rounded-xl border bg-muted/30 p-3 text-sm text-muted-foreground">
                  Existing GPS: ±{Number(entry.gpsAccuracy).toFixed(2)}m. Recapture only if you need to replace it.
                </p>
              ) : null}
            </div>
            <div className="grid gap-3">
              <GravePhotoCapture />
              {entry.gravePhotoUrl ? (
                <div className="overflow-hidden rounded-2xl border bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.gravePhotoUrl} alt="Existing grave photo" className="max-h-80 w-full object-cover" />
                  <p className="p-3 text-sm text-muted-foreground">Existing grave photo. Capture a new one only if you need to replace it.</p>
                </div>
              ) : null}
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border bg-background p-4 text-sm">
            <input type="checkbox" name="publishToRegistry" className="mt-1" defaultChecked={entry.publishToRegistry} />
            <span>
              <span className="font-medium">Prepare for public registry</span>
              <span className="mt-1 block text-muted-foreground">
                Approved identity and location fields can be shared publicly.
              </span>
            </span>
          </label>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" asChild>
              <Link href="/undertaker/mortuary-register">Cancel</Link>
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, defaultValue, placeholder }: { label: string; name: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
      />
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  )
}
