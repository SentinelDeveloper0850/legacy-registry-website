import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getDemoRegisterRows } from "@/lib/demo-workspace"

export default async function RegisterPage() {
  const entries = await getDemoRegisterRows()

  return (
    <section className="px-6 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Internal register</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Register entries</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Entries are scoped to the demo organisation.
            </p>
          </div>
          <Button asChild>
            <Link href="/undertaker/mortuary-register/new">New entry</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
          <div className="grid grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.7fr_0.7fr] gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Ref</span>
            <span>Name</span>
            <span>ID</span>
            <span>Cemetery</span>
            <span>Block</span>
            <span>Grave</span>
            <span>Status</span>
          </div>

          {entries.map((entry: any) => (
            <div key={entry.id} className="grid grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.7fr_0.7fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
              <span className="font-medium">{entry.bodyNumber}</span>
              <span>{entry.fullName}</span>
              <span className="text-muted-foreground">{entry.idNumber ?? "Not set"}</span>
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
