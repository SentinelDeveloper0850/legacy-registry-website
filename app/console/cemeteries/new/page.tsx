import Link from "next/link"

import { Button } from "@/components/ui/button"
import { createCemetery } from "../actions"

export const dynamic = "force-dynamic"

export default function NewCemeteryPage() {
  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console/cemeteries">Back to cemeteries</Link>
        </Button>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Console</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">New cemetery</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Add a cemetery that undertakers can reference when capturing burial-location details.
          </p>
        </div>

        <form action={createCemetery} className="grid gap-6 rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <Field label="Name" name="name" placeholder="Mooifontein Cemetery" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Municipality" name="municipality" placeholder="Ekurhuleni Metropolitan Municipality" />
            <Field label="Province" name="province" placeholder="Gauteng" />
          </div>
          <Field label="Address" name="address" placeholder="Street address or location notes" />

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" asChild>
              <Link href="/console/cemeteries">Cancel</Link>
            </Button>
            <Button type="submit">Create cemetery</Button>
          </div>
        </form>
      </div>
    </main>
  )
}

function Field({ label, name, placeholder, required = false }: { label: string; name: string; placeholder?: string; required?: boolean }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
      />
    </div>
  )
}
