import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getAdminDashboardStats } from "@/lib/admin-data"

export const dynamic = "force-dynamic"

export default async function ConsolePage() {
  const stats = await getAdminDashboardStats()

  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Console</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              System overview for organisations, cemetery data, and registry publishing.
            </p>
          </div>
          <Button asChild>
            <Link href="/console/system">Open system tools</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-[1.5rem] border bg-card p-5 shadow-sm">
              <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
