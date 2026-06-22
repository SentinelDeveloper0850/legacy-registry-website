import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getAdminDashboardStats } from "@/lib/admin-data"

export const dynamic = "force-dynamic"

const cardLinks: Record<string, string> = {
  Undertakers: "/console/undertakers",
  Users: "/console/users",
  Cemeteries: "/console/cemeteries",
  Blocks: "/console/cemetery-blocks",
  "Register entries": "/undertaker/mortuary-register",
  "Published records": "/search",
}

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
            <Link
              key={stat.label}
              href={cardLinks[stat.label] ?? "/console"}
              className="group rounded-[1.5rem] border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-3 focus:ring-ring/20"
            >
              <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
              <div className="mt-1 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <span>{stat.label}</span>
                <span className="text-xs opacity-0 transition group-hover:opacity-100">Open</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
