import { ArrowRight, Database, HeartHandshake, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

const stats = [
  { label: "Search by name", value: "Public" },
  { label: "Locate burial sites", value: "Map-ready" },
  { label: "Support records", value: "Burial + cremation" },
]

const features = [
  {
    icon: Search,
    title: "Find records faster",
    description:
      "Search for a loved one using names, burial dates, cemetery details, or partial information when the spelling is uncertain.",
  },
  {
    icon: MapPin,
    title: "Navigate to the exact place",
    description:
      "Capture grave coordinates so families can move from a search result to the correct cemetery block and grave location.",
  },
  {
    icon: Database,
    title: "Preserve cemetery knowledge",
    description:
      "Turn fragile paper records and scattered spreadsheets into a central registry that municipalities and undertakers can maintain.",
  },
]

export default function Page() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary),transparent_82%),transparent_36rem)]" />
        <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border bg-card shadow-sm">
                <HeartHandshake className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">Legacy Registry</p>
                <p className="text-xs text-muted-foreground">Cemetery records, made searchable</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a href="#search">Find a record</a>
            </Button>
          </header>

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <span className="size-1.5 rounded-full bg-foreground" />
                Proof of concept for searchable cemetery records
              </div>

              <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Find a loved one&apos;s resting place without chasing paper trails.
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                Legacy Registry helps families search burial and memorial records, identify the correct cemetery block, and navigate to the recorded grave location with confidence.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#search">
                    Start searching
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#features">See how it works</a>
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border bg-card p-4 shadow-sm">
                    <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="search" className="rounded-[2rem] border bg-card p-4 shadow-2xl shadow-foreground/5 sm:p-6">
              <div className="rounded-[1.5rem] border bg-background p-5 sm:p-6">
                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground">Public search</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Who are you looking for?</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Enter what you know. The search experience will support partial and fuzzy matching as the registry grows.
                  </p>
                </div>

                <form action="/search" className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full name or surname
                    </label>
                    <input
                      id="name"
                      name="q"
                      type="search"
                      placeholder="e.g. Nomsa Dlamini"
                      className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="cemetery" className="text-sm font-medium">
                        Cemetery
                      </label>
                      <input
                        id="cemetery"
                        name="cemetery"
                        type="text"
                        placeholder="Optional"
                        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="burialDate" className="text-sm font-medium">
                        Burial year
                      </label>
                      <input
                        id="burialDate"
                        name="burialYear"
                        type="text"
                        inputMode="numeric"
                        placeholder="Optional"
                        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="mt-2 w-full">
                    Search records
                    <Search className="size-4" aria-hidden="true" />
                  </Button>
                </form>
              </div>

              <div className="mt-4 rounded-[1.5rem] border bg-muted/40 p-5">
                <p className="text-sm font-medium">POC focus</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Start with searchable burial records. Then layer in coordinates, cemetery blocks, capacity reporting, and undertaker or municipality workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t bg-muted/30 px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[1.5rem] border bg-card p-6 shadow-sm">
              <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border bg-background">
                <feature.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
