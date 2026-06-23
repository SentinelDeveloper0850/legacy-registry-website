import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

const folder = "legacy-registry/graves"

export async function POST() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY

  if (!cloudName || !apiKey) {
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 })
  }

  const timestamp = Math.round(Date.now() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      timestamp,
    },
    process.env.CLOUDINARY_API_SECRET || "",
  )

  return NextResponse.json({
    apiKey,
    cloudName,
    folder,
    signature,
    timestamp,
  })
}
