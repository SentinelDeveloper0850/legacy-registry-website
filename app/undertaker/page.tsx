import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <section className="px-6 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Operations</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Workspace dashboard</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Demo area for capturing internal register entries and preparing approved public location details.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/undertaker/mortuary-register">Open register</Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border bg-card p-5 shadow-sm">
            <p className="text-3xl font-semibold tracking-tight">18</p>
            <p className="mt-1 text-sm text-muted-foreground">Active entries</p>
          </div>
          <div className="rounded-[1.5rem] border bg-card p-5 shadow-sm">
            <p className="text-3xl font-semibold tracking-tight">7</p>
            <p className="mt-1 text-sm text-muted-foreground">Pending details</p>
          </div>
          <div className="rounded-[1.5rem] border bg-card p-5 shadow-sm">
            <p className="text-3xl font-semibold tracking-tight">124</p>
            <p className="mt-1 text-sm text-muted-foreground">Shared records</p>
          </div>
        </div>
      </div>
    </section>
  )
}
