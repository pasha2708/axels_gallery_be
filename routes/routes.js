const { Router } = require('express')
const Pictures = require('../models/Schema')
const router = Router()

router.get('/images', async (req, res) => {
    const todos = await Pictures.find({})
    res.send(todos)
})

router.get('/images/:id', async (req, res) => {
    const data = await Pictures.findOne({ id: req.params.id })
    res.send(data)
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

module.exports = router
