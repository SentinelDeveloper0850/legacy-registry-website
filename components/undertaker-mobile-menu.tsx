"use client"

import Link from "next/link"
import { useState } from "react"
import { ClipboardList, Home, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function UndertakerMobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <Button type="button" variant="outline" size="icon" className="rounded-2xl" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </Button>

      {open ? (
        <div className="absolute inset-x-4 top-[5.75rem] z-20 overflow-hidden rounded-2xl border bg-card shadow-xl shadow-foreground/10">
          <Link href="/undertaker" className="flex items-center gap-3 border-b px-4 py-4 text-sm font-medium" onClick={() => setOpen(false)}>
            <Home className="size-4" aria-hidden="true" />
            Dashboard
          </Link>
          <Link href="/undertaker/mortuary-register" className="flex items-center gap-3 px-4 py-4 text-sm font-medium" onClick={() => setOpen(false)}>
            <ClipboardList className="size-4" aria-hidden="true" />
            Register
          </Link>
        </div>
      ) : null}
    </div>
  )
}
