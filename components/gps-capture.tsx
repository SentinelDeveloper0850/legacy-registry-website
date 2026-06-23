"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Crosshair, Loader2, MapPin, ShieldCheck, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

const targetAccuracy = 1

type CaptureState = "idle" | "watching" | "accepted" | "unsupported" | "error"

type Reading = {
  latitude: number
  longitude: number
  accuracy: number
  capturedAt: string
}

export function GpsCapture() {
  const watcher = useRef<number | null>(null)
  const [state, setState] = useState<CaptureState>("idle")
  const [best, setBest] = useState<Reading | null>(null)
  const [accepted, setAccepted] = useState<Reading | null>(null)
  const [message, setMessage] = useState<string>("Use this on a GPS-enabled phone while standing at the grave.")

  const status = useMemo(() => {
    if (accepted) {
      return `Accepted at ±${accepted.accuracy.toFixed(2)}m`
    }

    if (best) {
      return `Best reading so far: ±${best.accuracy.toFixed(2)}m`
    }

    return "No GPS reading captured yet"
  }, [accepted, best])

  useEffect(() => {
    return () => {
      if (watcher.current !== null) {
        navigator.geolocation.clearWatch(watcher.current)
      }
    }
  }, [])

  function stopWatching() {
    if (watcher.current !== null) {
      navigator.geolocation.clearWatch(watcher.current)
      watcher.current = null
    }
  }

  function startCapture() {
    if (!("geolocation" in navigator)) {
      setState("unsupported")
      setMessage("This device or browser does not support GPS location capture.")
      return
    }

    setState("watching")
    setAccepted(null)
    setMessage(`Waiting for GPS accuracy of ±${targetAccuracy}m or better.`)

    watcher.current = navigator.geolocation.watchPosition(
      (position) => {
        const reading: Reading = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          capturedAt: new Date().toISOString(),
        }

        setBest((current) => (!current || reading.accuracy < current.accuracy ? reading : current))

        if (reading.accuracy <= targetAccuracy) {
          setAccepted(reading)
          setState("accepted")
          setMessage("GPS location accepted. This reading meets the 1m accuracy requirement.")
          stopWatching()
        }
      },
      (error) => {
        setState("error")
        setMessage(error.message || "Unable to capture GPS location.")
        stopWatching()
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 60000,
      },
    )
  }

  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Crosshair className="size-5" aria-hidden="true" />
            <h3>GPS grave location</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Capture coordinates while standing at the grave. The record will only save coordinates once the GPS reading is ±1m or better.
          </p>
        </div>
        <Button type="button" onClick={startCapture} disabled={state === "watching"}>
          {state === "watching" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <MapPin className="size-4" aria-hidden="true" />}
          {state === "watching" ? "Capturing" : "Use current GPS"}
        </Button>
      </div>

      <div className="mt-4 rounded-xl border bg-muted/30 p-3 text-sm">
        <div className="flex items-start gap-2">
          {accepted ? <ShieldCheck className="mt-0.5 size-4 text-foreground" aria-hidden="true" /> : <TriangleAlert className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />}
          <div>
            <p className="font-medium">{status}</p>
            <p className="mt-1 text-muted-foreground">{message}</p>
          </div>
        </div>

        {best ? (
          <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            <p>Lat: {best.latitude.toFixed(7)}</p>
            <p>Lng: {best.longitude.toFixed(7)}</p>
            <p>Accuracy: ±{best.accuracy.toFixed(2)}m</p>
          </div>
        ) : null}
      </div>

      <input type="hidden" name="graveLatitude" value={accepted?.latitude ?? ""} />
      <input type="hidden" name="graveLongitude" value={accepted?.longitude ?? ""} />
      <input type="hidden" name="gpsAccuracy" value={accepted?.accuracy ?? ""} />
      <input type="hidden" name="gpsCapturedAt" value={accepted?.capturedAt ?? ""} />
    </div>
  )
}
