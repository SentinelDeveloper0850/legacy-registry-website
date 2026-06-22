import Link from "next/link"

import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { createCemeteryBlock } from "../actions"

export const dynamic = "force-dynamic"

export default async function NewCemeteryBlockPage() {
  const cemeteries = await prisma.cemetery.findMany({ orderBy: { name: "asc" } })

  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console/cemetery-blocks">Back to blocks</Link>
        </Button>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Console</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">New cemetery block</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Add a cemetery block for location lookup and basic capacity reporting.
          </p>
        </div>

        <form action={createCemeteryBlock} className="grid gap-6 rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <div className="grid gap-2">
            <label htmlFor="cemeteryId" className="text-sm font-medium">Cemetery</label>
            <select
              id="cemeteryId"
              name="cemeteryId"
              required
              className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Select cemetery</option>
              {cemeteries.map((cemetery) => (
                <option key={cemetery.id} value={cemetery.id}>{cemetery.name}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Block name" name="name" placeholder="Block 42B" required />
            <Field label="Capacity" name="capacity" placeholder="250" type="number" />
          </div>
          <Field label="Description" name="description" placeholder="Optional notes" />

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" asChild>
              <Link href="/console/cemetery-blocks">Cancel</Link>
            </Button>
            <Button type="submit">Create block</Button>
          </div>
        </form>
      </div>
    </main>
  )
}

function Field({ label, name, placeholder, type = "text", required = false }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
      />
    </div>
  )
}
