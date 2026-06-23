"use client"

import { useRef, useState } from "react"
import { Camera, ImageIcon, Loader2, RotateCcw, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

type PhotoState = {
  dataUrl: string
  capturedAt: string
  sizeKb: number
}

const maxImageSize = 1280
const jpegQuality = 0.72

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

async function compressImage(file: File) {
  const originalDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "")
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const image = await loadImage(originalDataUrl)
  const ratio = Math.min(1, maxImageSize / Math.max(image.width, image.height))
  const width = Math.round(image.width * ratio)
  const height = Math.round(image.height * ratio)

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext("2d")
  if (!context) {
    return originalDataUrl
  }

  context.drawImage(image, 0, 0, width, height)
  return canvas.toDataURL("image/jpeg", jpegQuality)
}

export function GravePhotoCapture() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [photo, setPhoto] = useState<PhotoState | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  function openCamera() {
    inputRef.current?.click()
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setIsProcessing(true)

    try {
      const dataUrl = await compressImage(file)
      setPhoto({
        dataUrl,
        capturedAt: new Date().toISOString(),
        sizeKb: Math.round(dataUrl.length / 1024),
      })
    } finally {
      setIsProcessing(false)
    }
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
            Capture a clear photo while standing at the grave. The image is resized before upload so it can save reliably on mobile.
          </p>
        </div>
        <Button type="button" onClick={openCamera} disabled={isProcessing}>
          {isProcessing ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Camera className="size-4" aria-hidden="true" />}
          {isProcessing ? "Processing" : photo ? "Retake photo" : "Capture photo"}
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
              <span>Photo ready · about {photo.sizeKb} KB</span>
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
