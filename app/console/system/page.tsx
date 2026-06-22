import Link from "next/link"

import { Button } from "@/components/ui/button"
import { clearDemo, seedDemo } from "./actions"

export const dynamic = "force-dynamic"

export default function ConsoleSystemPage() {
  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console">Back to console</Link>
        </Button>

        <div className="rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">System tools</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Demo data</h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Use these actions to create or remove the demo organisation, demo user, cemeteries, blocks, and sample register entries.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <form action={seedDemo}>
              <Button type="submit" className="w-full">Seed demo data</Button>
            </form>
            <form action={clearDemo}>
              <Button type="submit" variant="outline" className="w-full">Clear demo data</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
