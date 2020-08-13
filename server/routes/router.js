const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/user');
const movie_controller = require('../controllers/movie');


router.get('/', function(req, res){
	res.write("Hello World")
	res.end()
})

//user routes:

router.get('/users',user_controller.home)


// movies routes:

router.get('/movies',movie_controller.get_movies)

router.post('/movies', movie_controller.add_movie)

router.get('/movies/:id', movie_controller.get_movie)

router.put('/movies/:id', movie_controller.update_movie)

router.delete('/movies/:id', movie_controller.delete_movie)


module.exports = router;