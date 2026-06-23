import Link from "next/link"

import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { saveConsoleUser } from "../actions"

export const dynamic = "force-dynamic"

export default async function NewUserPage() {
  const undertakers = await prisma.undertaker.findMany({ orderBy: { name: "asc" } })

  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
          <Link href="/console/users">Back to users</Link>
        </Button>

        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Console</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">New user</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Add a user and assign them to an undertaker organisation.
          </p>
        </div>

        <form action={saveConsoleUser} className="grid gap-6 rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <div className="grid gap-2">
            <label htmlFor="undertakerId" className="text-sm font-medium">Undertaker</label>
            <select
              id="undertakerId"
              name="undertakerId"
              required
              className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Select undertaker</option>
              {undertakers.map((undertaker) => (
                <option key={undertaker.id} value={undertaker.id}>{undertaker.name}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Jane Doe" required />
            <Field label="Email" name="email" placeholder="jane@example.co.za" type="email" required />
          </div>

          <div className="grid gap-2">
            <label htmlFor="role" className="text-sm font-medium">Role</label>
            <select
              id="role"
              name="role"
              defaultValue="UNDERTAKER_USER"
              className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="UNDERTAKER_USER">Undertaker user</option>
              <option value="UNDERTAKER_ADMIN">Undertaker admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" asChild>
              <Link href="/console/users">Cancel</Link>
            </Button>
            <Button type="submit">Create user</Button>
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
