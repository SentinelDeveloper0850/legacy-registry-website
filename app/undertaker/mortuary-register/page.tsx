import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getDemoRegisterRows } from "@/lib/demo-workspace"

function identifier(entry: any) {
  return entry.idNumber || entry.alternateIdNumber || "Not set"
}

export default async function RegisterPage() {
  const entries = await getDemoRegisterRows()

  return (
    <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Internal register</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Register entries</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Entries are scoped to the selected undertaker workspace.
            </p>
          </div>
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/undertaker/mortuary-register/new">New entry</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:hidden">
          {entries.map((entry: any) => (
            <article key={entry.id} className="rounded-[1.5rem] border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{entry.bodyNumber}</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">{entry.fullName}</h2>
                </div>
                <span className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {entry.publishToRegistry ? "Ready" : "Draft"}
                </span>
              </div>

              <dl className="grid gap-3 text-sm">
                <Detail label="ID / Passport" value={identifier(entry)} />
                <Detail label="Cemetery" value={entry.cemetery?.name ?? "Not set"} />
                <div className="grid grid-cols-2 gap-3">
                  <Detail label="Block" value={entry.cemeteryBlock?.name ?? "Not set"} />
                  <Detail label="Grave" value={entry.graveNumber ?? "Not set"} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Detail label="GPS" value={entry.gpsAccuracy ? `±${Number(entry.gpsAccuracy).toFixed(2)}m` : "Not captured"} />
                  <Detail label="Photo" value={entry.gravePhotoUrl ? "Captured" : "Not captured"} />
                </div>
              </dl>
            </article>
          ))}

          {entries.length === 0 ? (
            <div className="rounded-[1.5rem] border bg-card px-5 py-10 text-center text-sm text-muted-foreground shadow-sm">
              No entries found yet.
            </div>
          ) : null}
        </div>

        <div className="hidden overflow-hidden rounded-[1.5rem] border bg-card shadow-sm md:block">
          <div className="grid grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.7fr_0.7fr] gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Ref</span>
            <span>Name</span>
            <span>ID / Passport</span>
            <span>Cemetery</span>
            <span>Block</span>
            <span>Grave</span>
            <span>Status</span>
          </div>

          {entries.map((entry: any) => (
            <div key={entry.id} className="grid grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.7fr_0.7fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
              <span className="font-medium">{entry.bodyNumber}</span>
              <span>{entry.fullName}</span>
              <span className="text-muted-foreground">{identifier(entry)}</span>
              <span>{entry.cemetery?.name ?? "Not set"}</span>
              <span>{entry.cemeteryBlock?.name ?? "Not set"}</span>
              <span>{entry.graveNumber ?? "Not set"}</span>
              <span className="text-muted-foreground">{entry.publishToRegistry ? "Ready" : "Draft"}</span>
            </div>
          ))}

          {entries.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No entries found yet.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words">{value}</dd>
    </div>
  )
}
