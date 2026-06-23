import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getUndertakerRows } from "@/lib/admin-data"

export const dynamic = "force-dynamic"

export default async function ConsoleUndertakersPage() {
  const rows = await getUndertakerRows()

  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console">Back to console</Link>
        </Button>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Console</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Undertakers</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Organisations currently configured in Legacy Registry.
            </p>
          </div>
          <Button asChild>
            <Link href="/console/undertakers/new">New undertaker</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_0.5fr_0.7fr] gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Name</span>
            <span>Trading name</span>
            <span>Branch</span>
            <span>Users</span>
            <span>Entries</span>
          </div>

          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-[1.2fr_1fr_1fr_0.5fr_0.7fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
              <span className="font-medium">{row.name}</span>
              <span>{row.tradingName ?? "Not set"}</span>
              <span>{row.branchName ?? "Not set"}</span>
              <span>{row._count.users}</span>
              <span>{row._count.mortuaryRegisterEntries}</span>
            </div>
          ))}

          {rows.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No undertakers found. Seed demo data from system tools.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
