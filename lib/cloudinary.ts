import { v2 as cloudinary } from "cloudinary"

cloudinary.config({ secure: true })

type UploadedImage = {
  url: string
  publicId: string
}

export async function uploadGravePhoto(dataUrl: string, folder = "legacy-registry/graves"): Promise<UploadedImage | null> {
  if (!dataUrl) {
    return null
  }

  const upload = await cloudinary.uploader.upload(dataUrl, {
    folder,
    resource_type: "image",
    overwrite: false,
  })

  return {
    url: upload.secure_url,
    publicId: upload.public_id,
  }
}
