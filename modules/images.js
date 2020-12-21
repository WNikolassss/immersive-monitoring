const sharp = require('sharp')

const transform = (image, { size = 300, rotate = 0 } = {}) =>
  sharp(Buffer.from(image.data))
    .resize(size, size)
    .rotate(rotate)
    .toBuffer()

async function composeImages({ image1, image2, image3, image4 }) {
  const [top, right, bottom, left] = await Promise.all([
    transform(image1),
    transform(image2, { rotate: 90 }),
    transform(image3, { rotate: 180 }),
    transform(image4, { rotate: 270 })
  ])
  return sharp({
    create: {
      width: 900,
      height: 900,
      channels: 4,
      background: 'black'
    }
  })
   .composite([
     { input: top, top: 0, left: 300 },
     { input: right, top: 300, left: 600 },
     { input: bottom, top: 600, left: 300 },
     { input: left, top: 300, left: 0 }
   ])
    .png()
    .toBuffer()
}

module.exports = { composeImages }
