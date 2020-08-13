const db = require('../database/db');

// const MovieModel = require('../models/movie')

// let Movie = new MovieModel(db)

exports.get_movies = function(req, res){

	let sql = 'select * from movie'

	db.query(sql, function(err, result){

		if(err) throw err; 

		return res.send(JSON.stringify(result))
	})
}


exports.get_movie = function(req, res){

	let id = req.params.id 

	let sql = 'select * from movie where id = ?'

	db.query(sql, id, function(err, result){

		if(err) throw err;

		return res.send(JSON.stringify(result))
	})
}


exports.add_movie = function(req,res){

	let movie = {
		'title': req.body.title,
		'release_date': req.body.release_date
	}
	// use this syntax to insert a dictionary
	let sql = 'insert into movie set ?'

	db.query(sql,movie, function(err, result){
		if(err) throw err;

		console.log('Number of record inserted: ' + result)
	})
	return res.send("Successfully Inserted")
}


exports.update_movie = function(req,res){

	let id = req.params.id;

	let sql = 'update movie set ? where id = ?';	

	db.query(sql, [req.body, id], function(err, result){

		if(err) throw err;

		console.log(result);
	})

	return res.send('Successfully updated')
}


exports.delete_movie = function(req,res){

	let id = req.params.id;

	let sql = 'delete from movie where id = ?'

	db.query(sql,id, function(err, result){

		if(err) throw err;

		console.log('Item has been Successfully deleted')

		console.log(result)
	})

	return res.send("Item has been succesfully deleted")
}