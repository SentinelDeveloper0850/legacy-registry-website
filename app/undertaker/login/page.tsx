import { Building2, LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { chooseWorkspaceUser } from "./actions"

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key]
  return Array.isArray(value) ? value[0] : value
}

export const dynamic = "force-dynamic"

export default async function UndertakerLoginPage({ searchParams }: PageProps) {
  const params = await searchParams
  const redirectTo = getParam(params, "redirectTo") || "/undertaker"
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: { undertaker: true },
    orderBy: { name: "asc" },
  })

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-6 py-12">
      <section className="w-full max-w-md rounded-[2rem] border bg-card p-6 shadow-xl shadow-foreground/5">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl border bg-background">
            <Building2 className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold">Legacy Registry</p>
            <p className="text-xs text-muted-foreground">Undertaker workspace</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border bg-muted/40">
            <LockKeyhole className="size-5" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Select a workspace user for this POC. Register entries will be scoped to that user’s undertaker.
          </p>
        </div>

        <form action={chooseWorkspaceUser} className="grid gap-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="grid gap-2">
            <label htmlFor="userId" className="text-sm font-medium">User</label>
            <select
              id="userId"
              name="userId"
              required
              className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} — {user.undertaker.tradingName ?? user.undertaker.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Continue to workspace
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          POC-only login. Production will use secure credentials and role-based access.
        </p>
      </section>
    </main>
  )
}
