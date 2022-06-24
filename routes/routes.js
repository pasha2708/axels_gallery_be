import { Router } from 'express'
import Pictures from '../models/Schema.js'

const router = Router()

router.get('/images', async (req, res) => {
  const data = await Pictures.find({})
  const images = data.map((item) => (
    {
      id: item.id,
      url: item.url
    }
  ))
  res.send(images)
})

router.get('/images/:id', async (req, res) => {
  const data = await Pictures.findOne({ id: req.params.id })
  if (data) {
    const { id, fullUrl: url, comments } = data
    return res.send({ id, url, comments })
  }
  return res.status(404).send('not found')
})

router.post('/images/:id/comments', async (req, res) => {
  await Pictures.findOneAndUpdate({ id: req.params.id }, { $push: { "comments": req.body } })
  const picture = await Pictures.findOne({ id: req.params.id })
  res.send(picture)
})

router.delete('/images/:id/comments/:commentId', async (req, res) => {
  const data = await Pictures.findOne({ id: req.params.id })
  data.comments = data.comments.filter((e) => e.id != req.params.commentId)
  await Pictures.findOneAndUpdate({ id: req.params.id }, data)
  const picture = await Pictures.findOne({ id: req.params.id })
  res.send(picture)
})

// router.put('/images/:id/comments/:commentId', async (req, res) => {
//   const data = await Pictures.findOne({ id: req.params.id })
//   data.comments = data.comments.filter((e) => e.id != req.params.commentId)
//   await Pictures.findOneAndUpdate({ id: req.params.id }, data)
//   const picture = await Pictures.findOne({ id: req.params.id })
//   res.send(picture)
// })

export default router
