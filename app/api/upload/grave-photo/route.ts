import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({ secure: true })

const ALLOWED = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"])

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ success: false, message: "Allowed types: JPG, JPEG, PNG, WEBP" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "legacy-registry/graves",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error)
            reject(error)
          } else {
            resolve(result)
          }
        },
      )

      stream.end(buffer)
    })

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        bytes: uploadResult.bytes,
        format: uploadResult.format,
      },
    })
  } catch (error) {
    console.error("Grave photo upload failed:", error)
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 })
  }
}
