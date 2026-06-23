"use client"

import { useRef, useState } from "react"
import { Camera, ImageIcon, RotateCcw, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

type PhotoState = {
  dataUrl: string
  capturedAt: string
}

export function GravePhotoCapture() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [photo, setPhoto] = useState<PhotoState | null>(null)

  function openCamera() {
    inputRef.current?.click()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""

      if (result) {
        setPhoto({ dataUrl: result, capturedAt: new Date().toISOString() })
      }
    }
    reader.readAsDataURL(file)
  }

  function clearPhoto() {
    setPhoto(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Camera className="size-5" aria-hidden="true" />
            <h3>Grave photo</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Capture a clear photo while standing at the grave. This helps visitors identify the exact grave within the GPS radius.
          </p>
        </div>
        <Button type="button" onClick={openCamera}>
          <Camera className="size-4" aria-hidden="true" />
          {photo ? "Retake photo" : "Capture photo"}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {photo ? (
        <div className="mt-4 overflow-hidden rounded-2xl border bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.dataUrl} alt="Captured grave" className="max-h-80 w-full object-cover" />
          <div className="flex flex-col justify-between gap-3 p-3 text-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="size-4" aria-hidden="true" />
              <span>Photo captured</span>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={clearPhoto}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 rounded-xl border bg-muted/30 p-3 text-sm text-muted-foreground">
          <ImageIcon className="size-4" aria-hidden="true" />
          <span>No grave photo captured yet.</span>
        </div>
      )}

      <input type="hidden" name="gravePhotoDataUrl" value={photo?.dataUrl ?? ""} />
      <input type="hidden" name="gravePhotoCapturedAt" value={photo?.capturedAt ?? ""} />
    </div>
  )
}
