import Link from "next/link"
import { ArrowLeft, CalendarDays, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

const records = [
  {
    id: "rec_nomsa_dlamini",
    fullName: "Nomsa Dlamini",
    dates: "1948 - 2021",
    burialDate: "18 Jun 2021",
    cemetery: "Mooifontein Cemetery",
    location: "Block D · Row 4 · Grave 145",
    status: "Coordinates captured",
  },
  {
    id: "rec_joseph_mokoena",
    fullName: "Joseph Mokoena",
    dates: "1939 - 2017",
    burialDate: "02 Sep 2017",
    cemetery: "Mooifontein Cemetery",
    location: "Block B · Row 11 · Grave 78",
    status: "Block location only",
  },
  {
    id: "rec_thandiwe_khumalo",
    fullName: "Thandiwe Khumalo",
    dates: "1956 - 2020",
    burialDate: "Memorial record",
    cemetery: "Kempton Park Cemetery",
    location: "Memorial Wall · Panel 2 · Niche 19",
    status: "Coordinates captured",
  },
]

type SearchParams = Promise<Record<string, string | string[] | undefined>>

type PageProps = {
  searchParams: SearchParams
}

function getParam(params: Awaited<SearchParams>, key: string) {
  const value = params[key]

  if (Array.isArray(value)) {
    return value[0] ?? ""
  }

  return value ?? ""
}

function normalise(value: string) {
  return value.trim().toLowerCase()
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = getParam(params, "q")
  const cemetery = getParam(params, "cemetery")
  const burialYear = getParam(params, "burialYear")

  const filteredRecords = records.filter((record) => {
    const matchesName = query ? normalise(record.fullName).includes(normalise(query)) : true
    const matchesCemetery = cemetery ? normalise(record.cemetery).includes(normalise(cemetery)) : true
    const matchesYear = burialYear ? normalise(record.burialDate).includes(normalise(burialYear)) : true

    return matchesName && matchesCemetery && matchesYear
  })

  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="border-b bg-muted/30 px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Button variant="ghost" className="mb-8 w-fit px-0 hover:bg-transparent" asChild>
            <Link href="/">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Legacy Registry Search</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Search results</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Review matching cemetery records and open a result to confirm the recorded resting place.
              </p>
            </div>

            <form action="/search" className="rounded-[1.5rem] border bg-card p-4 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-[1fr_0.8fr_0.5fr_auto]">
                <input
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Name or surname"
                  className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                />
                <input
                  name="cemetery"
                  type="text"
                  defaultValue={cemetery}
                  placeholder="Cemetery"
                  className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                />
                <input
                  name="burialYear"
                  type="text"
                  inputMode="numeric"
                  defaultValue={burialYear}
                  placeholder="Year"
                  className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                />
                <Button type="submit" className="h-10">
                  <Search className="size-4" aria-hidden="true" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {filteredRecords.length} {filteredRecords.length === 1 ? "record" : "records"} found
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Matching records</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/search">Clear search</Link>
            </Button>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="grid gap-4">
              {filteredRecords.map((record) => (
                <article key={record.id} className="rounded-[1.5rem] border bg-card p-5 shadow-sm">
                  <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{record.fullName}</h3>
                      <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                        <div className="flex gap-2">
                          <CalendarDays className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                          <div>
                            <p className="font-medium text-foreground">{record.dates}</p>
                            <p>Buried: {record.burialDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:col-span-2">
                          <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                          <div>
                            <p className="font-medium text-foreground">{record.cemetery}</p>
                            <p>{record.location}</p>
                            <p>{record.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/records/${record.id}`}>View record</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border bg-card p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight">No matching records yet</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Try fewer details. Fuzzy matching will come once the database-backed search is connected.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
