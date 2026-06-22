import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NewRegisterEntryPage() {
  return (
    <section className="px-6 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" className="mb-6 px-0 hover:bg-transparent" asChild>
            <Link href="/undertaker/mortuary-register">Back to register</Link>
          </Button>
          <p className="text-sm font-medium text-muted-foreground">Capture entry</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">New register entry</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            This form mirrors the important fields from the paper register, while keeping private workflow details separate from public registry data.
          </p>
        </div>

        <form className="grid gap-6 rounded-[1.5rem] border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Reference number" name="reference" placeholder="SDK 560" />
            <Field label="ID number" name="idNumber" placeholder="0000000000000" />
            <Field label="First names" name="firstNames" placeholder="Nomsa" />
            <Field label="Last name" name="lastName" placeholder="Dlamini" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Date received" name="dateReceived" type="date" />
            <Field label="Date released" name="dateReleased" type="date" />
            <Field label="Time released" name="timeReleased" type="time" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Driver" name="driver" placeholder="Driver name" />
            <Field label="Coffin type" name="coffinType" placeholder="Standard / custom" />
          </div>

          <div className="rounded-2xl border bg-muted/30 p-4">
            <h2 className="font-semibold tracking-tight">Public location details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These are the fields that may later flow to Legacy Registry after review.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field label="Cemetery" name="cemetery" placeholder="Mooifontein" />
              <Field label="Block" name="block" placeholder="Block 42B" />
              <Field label="Grave number" name="graveNumber" placeholder="111" />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border bg-background p-4 text-sm">
            <input type="checkbox" name="publishToRegistry" className="mt-1" defaultChecked />
            <span>
              <span className="font-medium">Prepare for public registry</span>
              <span className="mt-1 block text-muted-foreground">
                Only approved identity and location fields should be shared publicly.
              </span>
            </span>
          </label>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" asChild>
              <Link href="/undertaker/mortuary-register">Cancel</Link>
            </Button>
            <Button type="button">Save demo entry</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
      />
    </div>
  )
}
