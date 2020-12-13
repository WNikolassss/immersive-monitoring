const sharp = require('sharp')

async function composeImages(input) {
  const resized = sharp(input).resize(300)
  const [top, right, bottom, left] = await Promise.all([
    resized.clone().toBuffer(),
    resized.clone().rotate(90).toBuffer(),
    resized.clone().rotate(180).toBuffer(),
    resized.clone().rotate(270).toBuffer()
  ])
  return sharp({
    create: {
      width: 900,
      height: 900,
      background: 'alpha'
    }
  })
   .composite([
     { input: top, top: 0, left: 300 },
     { input: right, top: 300, left: 600 },
     { input: bottom, top: 600, left: 300 },
     { input: left, top: 300, left: 0 }
   ])
    .toBuffer()
}
