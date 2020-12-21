const express = require('express')
const cors = require('cors')
const { Duplex } = require('stream')
const fileUpload = require('express-fileupload')

const { composeImages, uploadImage } = require('./modules')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.post('*', fileUpload(), async (req, res) => {
  try {
    const transformed = await composeImages(req.files)
    const uploaded = await uploadImage(transformed)
    return res.status(200).json(uploaded)
  } catch (e) {
    console.error('ERROR', e)
    return res.status(500).json({ message: e.message || 'Something went wrong' })
  }
})

app.listen(PORT, () => console.log('Server is listening on port: ', PORT))
