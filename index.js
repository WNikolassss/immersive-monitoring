const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { composeImages, uploadImage, listUploaded } = require('./modules')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  try {
    const uploaded = await listUploaded()
    return res.status(200).json(uploaded)
  } catch (e) {
    console.error('ERROR', e)
    return res.status(500).json({ message: e.message || 'Something went wrong' })
  }
})

app.post('/', fileUpload(), async (req, res) => {
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
