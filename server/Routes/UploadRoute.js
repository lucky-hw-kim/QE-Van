import multer from "multer"
import express from "express"

// Image upload routes & controller
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({storage: storage})

router.post('/', upload.single("file", (req, res) => {
  try {
    return res.status(200).json("File uploaded Successfuly")
    // console.log(req.file, req.body)
  } catch (err) {
    res.status(400).json(err)
  }
}))

export default router;