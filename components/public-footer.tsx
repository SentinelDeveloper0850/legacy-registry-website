import Link from "next/link"
import { HeartHandshake } from "lucide-react"

const linkGroups = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Search records", href: "/search" },
    ],
  },
  {
    title: "Undertakers",
    links: [
      { label: "Undertaker login", href: "/undertaker/login" },
      { label: "Mortuary register", href: "/undertaker/mortuary-register" },
      { label: "Capture entry", href: "/undertaker/mortuary-register/new" },
    ],
  },
  {
    title: "POC admin",
    links: [
      { label: "Console dashboard", href: "/console" },
      { label: "System tools", href: "/console/system" },
    ],
  },
]

export function PublicFooter() {
  return (
    <footer className="border-t bg-card text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-8 md:grid-cols-[1.2fr_2fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border bg-background">
              <HeartHandshake className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold">Legacy Registry</p>
              <p className="text-xs text-muted-foreground">POC navigation</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Preserving burial records and making cemetery locations searchable for families, undertakers, and municipalities.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t px-6 py-4 text-center text-xs text-muted-foreground sm:px-8 lg:px-10">
        © 2026 Legacy Registry. Proof of concept build.
      </div>
    </footer>
  )
}
