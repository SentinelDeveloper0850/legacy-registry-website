import Link from "next/link"

import { Button } from "@/components/ui/button"
import { createUndertaker } from "../actions"

export const dynamic = "force-dynamic"

export default function NewUndertakerPage() {
  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console/undertakers">Back to undertakers</Link>
        </Button>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Console</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">New undertaker</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Add an undertaker organisation that can own users and register entries.
          </p>
        </div>

        <form action={createUndertaker} className="grid gap-6 rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <Field label="Registered name" name="name" placeholder="Somdaka Funeral Services" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Trading name" name="tradingName" placeholder="SDK Funeral Services" />
            <Field label="Branch" name="branchName" placeholder="Head Office" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Contact email" name="contactEmail" placeholder="info@example.co.za" type="email" />
            <Field label="Contact phone" name="contactPhone" placeholder="+27 00 000 0000" />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" asChild>
              <Link href="/console/undertakers">Cancel</Link>
            </Button>
            <Button type="submit">Create undertaker</Button>
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
