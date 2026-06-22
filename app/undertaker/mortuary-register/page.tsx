import Link from "next/link"

import { Button } from "@/components/ui/button"

const entries = [
  {
    reference: "SDK 557",
    name: "Nomsa Dlamini",
    idNumber: "4808120000000",
    date: "18 Jun 2021",
    cemetery: "Mooifontein Cemetery",
    block: "Block 42B",
    grave: "111",
    status: "Ready",
  },
  {
    reference: "SDK 558",
    name: "Joseph Mokoena",
    idNumber: "3902250000000",
    date: "02 Sep 2017",
    cemetery: "Mooifontein Cemetery",
    block: "Block 46",
    grave: "08",
    status: "Draft",
  },
  {
    reference: "SDK 559",
    name: "Thandiwe Khumalo",
    idNumber: "5606070000000",
    date: "12 Mar 2020",
    cemetery: "Waterfall Cemetery",
    block: "Block D",
    grave: "R-75",
    status: "Ready",
  },
]

export default function RegisterPage() {
  return (
    <section className="px-6 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Internal register</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Register entries</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Capture the internal workflow and prepare clean location data for the public registry.
            </p>
          </div>
          <Button asChild>
            <Link href="/undertaker/mortuary-register/new">New entry</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border bg-card shadow-sm">
          <div className="grid grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.7fr_0.7fr] gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Ref</span>
            <span>Name</span>
            <span>ID</span>
            <span>Cemetery</span>
            <span>Block</span>
            <span>Grave</span>
            <span>Status</span>
          </div>

          {entries.map((entry) => (
            <div key={entry.reference} className="grid grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.7fr_0.7fr] gap-4 border-b px-5 py-4 text-sm last:border-b-0">
              <span className="font-medium">{entry.reference}</span>
              <span>{entry.name}</span>
              <span className="text-muted-foreground">{entry.idNumber}</span>
              <span>{entry.cemetery}</span>
              <span>{entry.block}</span>
              <span>{entry.grave}</span>
              <span className="text-muted-foreground">{entry.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
