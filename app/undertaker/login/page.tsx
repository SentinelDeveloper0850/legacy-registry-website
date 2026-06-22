"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Building2, LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function UndertakerLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/undertaker"

  function handleDemoLogin() {
    window.localStorage.setItem("legacy-registry-undertaker-auth", "true")
    router.push(redirectTo)
  }

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
            Demo access for managing an undertaker mortuary register before publishing cleaned burial records to the public registry.
          </p>
        </div>

        <Button type="button" size="lg" className="w-full" onClick={handleDemoLogin}>
          Continue as SDK Head Office
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          POC-only authentication. Production will use proper organisation users and roles.
        </p>
      </section>
    </main>
  )
}
