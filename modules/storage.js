const cloudinary = require('cloudinary/lib/v2')

cloudinary.config()

function listUploaded() {
  return cloudinary.api.resources({ type: 'upload' })
}

function uploadImage(buffer) {
  const base64 = buffer.toString('base64')
  return cloudinary.uploader.upload(`data:image/png;base64,${base64}`)
}

module.exports = {
  listUploaded,
  uploadImage
}
