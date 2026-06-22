import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getCemeteryBlockRows } from "@/lib/admin-data"

export const dynamic = "force-dynamic"

export default async function ConsoleCemeteryBlocksPage() {
  const rows = await getCemeteryBlockRows()

  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console">Back to console</Link>
        </Button>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Console</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Cemetery blocks</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Blocks grouped under cemeteries for grave location and capacity reporting.
            </p>
          </div>
          <Button asChild>
            <Link href="/console/cemetery-blocks/new">New block</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
          <div className="grid grid-cols-[1fr_1.2fr_0.8fr_0.7fr_0.7fr] gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Block</span>
            <span>Cemetery</span>
            <span>Capacity</span>
            <span>Entries</span>
            <span>Remaining</span>
          </div>

          {rows.map((row) => {
            const occupied = row._count.mortuaryRegisterEntries
            const remaining = typeof row.capacity === "number" ? Math.max(row.capacity - occupied, 0) : null

            return (
              <div key={row.id} className="grid grid-cols-[1fr_1.2fr_0.8fr_0.7fr_0.7fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
                <span className="font-medium">{row.name}</span>
                <span>{row.cemetery.name}</span>
                <span>{row.capacity ?? "Not set"}</span>
                <span>{occupied}</span>
                <span>{remaining ?? "Unknown"}</span>
              </div>
            )
          })}

          {rows.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No blocks found. Seed demo data from system tools.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
