const cloudinary = require('cloudinary/lib/v2')

function uploadImage(buffer) {
  const base64 = buffer.toString('base64')
  return cloudinary.uploader.upload(`data:image/png;base64,${base64}`)
}

module.exports = {
  uploadImage
}
