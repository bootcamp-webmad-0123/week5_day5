const express = require('express')
const uploaderMiddleware = require('../middleware/uploader.middleware')
const router = express.Router()

const Movie = require('./../models/Movie.model')

router.get("/crear", (req, res, next) => {
    res.render("movies/create")
})


router.post("/crear", uploaderMiddleware.single('imageUrl'), (req, res, next) => {

    const { title, description } = req.body
    const { path: imageUrl } = req.file

    Movie
        .create({ title, description, imageUrl })
        .then(() => res.redirect('/peliculas'))
        .catch(err => next(err))
})


router.get("/", (req, res, next) => {

    Movie
        .find()
        .then(movies => res.render('movies/list', { movies }))
        .catch(err => next(err))
})



module.exports = router