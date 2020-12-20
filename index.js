const express = require('express')
const cors = require('cors')
const { Duplex } = require('stream')
const fileUpload = require('express-fileupload')

const { composeImages } = require('./modules/images')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.post('*', fileUpload(), async (req, res) => {
  try {
    const image = Buffer.from(req.files.image.data)
    const result = await composeImages(image)
    const stream = new Duplex()
    res.set({
      'content-type': 'image/png',
      'content-length': Buffer.byteLength(result)
    })
    stream.push(result)
    stream.push(null)
    stream.pipe(res)
  } catch (e) {
    console.error('ERROR', e)
    return res.status(500).json({ message: e.message || 'Something went wrong' })
  }
})

app.listen(PORT, () => console.log('Server is listening on port: ', PORT))
