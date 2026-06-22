import Link from "next/link"
import { Building2, Database, Home, Landmark } from "lucide-react"

export const dynamic = "force-dynamic"

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-svh bg-muted/30 text-foreground">
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border bg-background">
              <Landmark className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">Legacy Registry Admin</p>
              <p className="text-xs text-muted-foreground">System administration</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted">
              <Home className="size-4" aria-hidden="true" />
              Dashboard
            </Link>
            <Link href="/admin/undertakers" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted">
              <Building2 className="size-4" aria-hidden="true" />
              Undertakers
            </Link>
            <Link href="/admin/system" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-muted">
              <Database className="size-4" aria-hidden="true" />
              System
            </Link>
          </nav>
        </div>
      </div>

      {children}
    </main>
  )
}
