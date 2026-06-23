"use client"

import { useRef, useState } from "react"
import { Camera, CircleCheck, CircleX, ImageIcon, Loader2, RotateCcw, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"

type PhotoState = {
  previewUrl: string
  capturedAt: string
  sizeKb: number
  cloudinaryUrl?: string
  publicId?: string
}

type UploadState = "idle" | "processing" | "uploading" | "uploaded" | "failed"

type UploadResponse = {
  success: boolean
  message?: string
  data?: {
    url: string
    publicId: string
  }
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
    return { dataUrl: originalDataUrl, blob: file }
  }

  context.drawImage(image, 0, 0, width, height)
  const dataUrl = canvas.toDataURL("image/jpeg", jpegQuality)
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((value) => resolve(value || file), "image/jpeg", jpegQuality)
  })

  return { dataUrl, blob }
}

function uploadToServer(blob: Blob, onProgress: (progress: number) => void) {
  return new Promise<UploadResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const data = new FormData()

    data.append("file", blob, "grave-photo.jpg")

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    }

    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText || "{}")

      if (xhr.status >= 200 && xhr.status < 300 && response.success) {
        resolve(response)
      } else {
        reject(new Error(response.message || "Photo upload failed"))
      }
    }

    xhr.onerror = () => reject(new Error("Photo upload failed"))
    xhr.open("POST", "/api/upload/grave-photo")
    xhr.send(data)
  })
}

export function GravePhotoCapture() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [photo, setPhoto] = useState<PhotoState | null>(null)
  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  function openCamera() {
    inputRef.current?.click()
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setError(null)
    setProgress(0)
    setUploadState("processing")

    try {
      const { dataUrl, blob } = await compressImage(file)
      const capturedAt = new Date().toISOString()

      setPhoto({
        previewUrl: dataUrl,
        capturedAt,
        sizeKb: Math.round(blob.size / 1024),
      })

      setUploadState("uploading")
      const upload = await uploadToServer(blob, setProgress)

      setPhoto({
        previewUrl: dataUrl,
        capturedAt,
        sizeKb: Math.round(blob.size / 1024),
        cloudinaryUrl: upload.data?.url,
        publicId: upload.data?.publicId,
      })
      setProgress(100)
      setUploadState("uploaded")
    } catch (uploadError) {
      console.error(uploadError)
      setUploadState("failed")
      setError(uploadError instanceof Error ? uploadError.message : "Photo upload failed")
    }
  }

  function clearPhoto() {
    setPhoto(null)
    setProgress(0)
    setError(null)
    setUploadState("idle")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const isBusy = uploadState === "processing" || uploadState === "uploading"

  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Camera className="size-5" aria-hidden="true" />
            <h3>Grave photo</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Capture a clear photo while standing at the grave. Upload progress will show here before you save the entry.
          </p>
        </div>
        <Button type="button" onClick={openCamera} disabled={isBusy}>
          {isBusy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Camera className="size-4" aria-hidden="true" />}
          {isBusy ? "Please wait" : photo ? "Retake photo" : "Capture photo"}
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
          <img src={photo.previewUrl} alt="Captured grave" className="max-h-80 w-full object-cover" />
          <div className="grid gap-3 p-3 text-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                {uploadState === "uploaded" ? <CircleCheck className="size-4" aria-hidden="true" /> : null}
                {uploadState === "failed" ? <CircleX className="size-4" aria-hidden="true" /> : null}
                {isBusy ? <UploadCloud className="size-4" aria-hidden="true" /> : null}
                <span>
                  {uploadState === "processing" ? "Preparing photo" : null}
                  {uploadState === "uploading" ? `Uploading photo · ${progress}%` : null}
                  {uploadState === "uploaded" ? `Uploaded · about ${photo.sizeKb} KB` : null}
                  {uploadState === "failed" ? "Upload failed" : null}
                </span>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={clearPhoto}>
                <RotateCcw className="size-4" aria-hidden="true" />
                Clear
              </Button>
            </div>

            {uploadState === "uploading" ? (
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-foreground transition-all" style={{ width: `${progress}%` }} />
              </div>
            ) : null}

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 rounded-xl border bg-muted/30 p-3 text-sm text-muted-foreground">
          <ImageIcon className="size-4" aria-hidden="true" />
          <span>No grave photo captured yet.</span>
        </div>
      )}

      <input type="hidden" name="gravePhotoUrl" value={photo?.cloudinaryUrl ?? ""} />
      <input type="hidden" name="gravePhotoPublicId" value={photo?.publicId ?? ""} />
      <input type="hidden" name="gravePhotoCapturedAt" value={uploadState === "uploaded" ? photo?.capturedAt ?? "" : ""} />
    </div>
  )
}
