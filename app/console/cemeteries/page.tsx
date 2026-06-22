import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getCemeteryRows } from "@/lib/admin-data"

export const dynamic = "force-dynamic"

export default async function ConsoleCemeteriesPage() {
  const rows = await getCemeteryRows()

  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console">Back to console</Link>
        </Button>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Console</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Cemeteries</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Cemetery records used for grave location and future capacity planning.
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
          <div className="grid grid-cols-[1.2fr_1.2fr_0.8fr_0.5fr_0.7fr] gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Name</span>
            <span>Municipality</span>
            <span>Province</span>
            <span>Blocks</span>
            <span>Entries</span>
          </div>

          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-[1.2fr_1.2fr_0.8fr_0.5fr_0.7fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
              <span className="font-medium">{row.name}</span>
              <span>{row.municipality ?? "Not set"}</span>
              <span>{row.province ?? "Not set"}</span>
              <span>{row._count.blocks}</span>
              <span>{row._count.mortuaryRegisterEntries}</span>
            </div>
          ))}

          {rows.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No cemeteries found. Seed demo data from system tools.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
